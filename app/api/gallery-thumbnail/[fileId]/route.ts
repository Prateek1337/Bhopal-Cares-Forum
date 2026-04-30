import { NextResponse } from "next/server"

const GALLERY_DEBUG = process.env.GALLERY_DEBUG !== "false"
const THUMBNAIL_PROXY_CACHE_SECONDS = 60 * 30

type RouteContext = {
  params: Promise<{
    fileId: string
  }>
}

export async function GET(_: Request, context: RouteContext) {
  const { fileId } = await context.params
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "Missing GOOGLE_DRIVE_API_KEY" }, { status: 500 })
  }

  const metadataUrl = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?fields=id,thumbnailLink&key=${apiKey}`
  const safeMetadataUrl = metadataUrl.replace(/key=[^&]+/, "key=***")

  try {
    const metadataResponse = await fetch(metadataUrl, { cache: "no-store" })
    const metadataContentType = metadataResponse.headers.get("content-type") || "unknown"
    const metadataContentLength = metadataResponse.headers.get("content-length") || "unknown"

    if (GALLERY_DEBUG) {
      console.log("[gallery][thumbnail-proxy][metadata-response]", {
        fileId,
        url: safeMetadataUrl,
        status: metadataResponse.status,
        contentType: metadataContentType,
        contentLength: metadataContentLength,
      })
    }

    if (!metadataResponse.ok) {
      const body = await metadataResponse.text()
      if (GALLERY_DEBUG) {
        console.error("[gallery][thumbnail-proxy][metadata-non-ok]", {
          fileId,
          url: safeMetadataUrl,
          status: metadataResponse.status,
          contentType: metadataContentType,
          contentLength: metadataContentLength,
          body,
        })
      }
      return new NextResponse(body || "Thumbnail metadata fetch failed", {
        status: metadataResponse.status,
        headers: { "content-type": metadataResponse.headers.get("content-type") || "text/plain" },
      })
    }

    const metadata = (await metadataResponse.json()) as { thumbnailLink?: string }
    if (!metadata.thumbnailLink) {
      if (GALLERY_DEBUG) {
        console.error("[gallery][thumbnail-proxy][metadata-missing-thumbnail-link]", {
          fileId,
          url: safeMetadataUrl,
          status: metadataResponse.status,
          metadata,
        })
      }
      return NextResponse.json({ error: "Thumbnail not available for file" }, { status: 404 })
    }

    const thumbnailResponse = await fetch(metadata.thumbnailLink, { cache: "no-store" })
    const thumbnailContentType = thumbnailResponse.headers.get("content-type") || "unknown"
    const thumbnailContentLength = thumbnailResponse.headers.get("content-length") || "unknown"

    if (GALLERY_DEBUG) {
      console.log("[gallery][thumbnail-proxy][thumbnail-response]", {
        fileId,
        status: thumbnailResponse.status,
        contentType: thumbnailContentType,
        contentLength: thumbnailContentLength,
      })
    }

    if (!thumbnailResponse.ok) {
      const body = await thumbnailResponse.text()
      if (GALLERY_DEBUG) {
        console.error("[gallery][thumbnail-proxy][thumbnail-non-ok]", {
          fileId,
          status: thumbnailResponse.status,
          contentType: thumbnailContentType,
          contentLength: thumbnailContentLength,
          body,
        })
      }
      return new NextResponse(body || "Thumbnail fetch failed", {
        status: thumbnailResponse.status,
        headers: { "content-type": thumbnailResponse.headers.get("content-type") || "text/plain" },
      })
    }

    const contentType = thumbnailResponse.headers.get("content-type") || "image/jpeg"
    const buffer = await thumbnailResponse.arrayBuffer()

    if (GALLERY_DEBUG) {
      console.log("[gallery][thumbnail-proxy][ok]", {
        fileId,
        status: thumbnailResponse.status,
        contentType,
        contentLength: thumbnailContentLength,
        responseBytes: buffer.byteLength,
      })
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": `public, max-age=${THUMBNAIL_PROXY_CACHE_SECONDS}, s-maxage=${THUMBNAIL_PROXY_CACHE_SECONDS}, stale-while-revalidate=3600`,
      },
    })
  } catch (error) {
    if (GALLERY_DEBUG) {
      console.error("[gallery][thumbnail-proxy][exception]", {
        fileId,
        error: error instanceof Error ? error.message : String(error),
      })
    }
    return NextResponse.json({ error: "Unexpected error while fetching thumbnail" }, { status: 500 })
  }
}
