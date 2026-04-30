import { NextResponse } from "next/server"

const GALLERY_DEBUG = process.env.GALLERY_DEBUG !== "false"
const IMAGE_PROXY_CACHE_SECONDS = 60 * 60

type RouteContext = {
  params: Promise<{
    fileId: string
  }>
}

export async function GET(_: Request, context: RouteContext) {
  const { fileId } = await context.params
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GOOGLE_DRIVE_API_KEY" },
      { status: 500 }
    )
  }

  const url = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media&key=${apiKey}`

  try {
    const response = await fetch(url, { cache: "no-store" })

    if (!response.ok) {
      const body = await response.text()

      if (GALLERY_DEBUG) {
        console.error("[gallery][image-proxy][non-ok]", {
          fileId,
          status: response.status,
          body,
        })
      }

      return new NextResponse(body || "Image fetch failed", {
        status: response.status,
        headers: {
          "content-type": response.headers.get("content-type") || "text/plain",
        },
      })
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream"
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": `public, max-age=${IMAGE_PROXY_CACHE_SECONDS}, s-maxage=${IMAGE_PROXY_CACHE_SECONDS}, stale-while-revalidate=86400`,
      },
    })
  } catch (error) {
    if (GALLERY_DEBUG) {
      console.error("[gallery][image-proxy][exception]", {
        fileId,
        error: error instanceof Error ? error.message : String(error),
      })
    }

    return NextResponse.json(
      { error: "Unexpected error while fetching image" },
      { status: 500 }
    )
  }
}
