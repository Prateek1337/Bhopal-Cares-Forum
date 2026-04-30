import type { GalleryCategory, GalleryItem } from "@/lib/gallery-data"

type DriveFile = {
  id: string
  name: string
  mimeType: string
  modifiedTime?: string
  thumbnailLink?: string
}

const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3/files"
const GALLERY_DEBUG = process.env.GALLERY_DEBUG !== "false"
const SUPPORTED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
])

const categoryFolderEnvMap: Record<GalleryCategory, string | undefined> = {
  plantation: process.env.GOOGLE_DRIVE_FOLDER_ID_PLANTATION,
  cleaning: process.env.GOOGLE_DRIVE_FOLDER_ID_CLEANLINESS,
  cloth: process.env.GOOGLE_DRIVE_FOLDER_ID_DONATION,
  dustbin: process.env.GOOGLE_DRIVE_FOLDER_ID_DUSTBIN_INSTALLATION,
  seedball: process.env.GOOGLE_DRIVE_FOLDER_ID_SEEDBALL_MAKING,
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchWithRetry(url: string, retries = 2): Promise<Response> {
  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, { cache: "no-store" })
      if (!response.ok) {
        const body = await response.text()
        if (GALLERY_DEBUG) {
          console.error("[gallery][drive-api][non-ok]", {
            status: response.status,
            url: url.replace(/key=[^&]+/, "key=***"),
            body,
          })
        }
        throw new Error(`Drive API ${response.status}: ${body}`)
      }
      return response
    } catch (error) {
      if (GALLERY_DEBUG) {
        console.error("[gallery][drive-api][retry]", {
          attempt,
          url: url.replace(/key=[^&]+/, "key=***"),
          error: error instanceof Error ? error.message : String(error),
        })
      }
      lastError = error
      if (attempt < retries) {
        await wait(350 * (attempt + 1))
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Drive request failed")
}

function formatDate(input?: string) {
  if (!input) return "Unknown date"
  const d = new Date(input)
  if (Number.isNaN(d.getTime())) return "Unknown date"
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function driveImageUrl(fileId: string) {
  return `/api/gallery-image/${fileId}`
}

export function driveThumbnailUrl(fileId: string) {
  return `/api/gallery-thumbnail/${fileId}`
}

async function listFolderChildren(parentId: string, apiKey: string) {
  const q = `'${parentId}' in parents and trashed=false`
  const fields = "files(id,name,mimeType,modifiedTime,thumbnailLink)"
  const url = `${DRIVE_API_BASE}?q=${encodeURIComponent(q)}&fields=${encodeURIComponent(fields)}&key=${apiKey}`
  const response = await fetchWithRetry(url)
  const json = (await response.json()) as { files?: DriveFile[] }
  return json.files ?? []
}

export async function getDriveGalleryByCategory(category: GalleryCategory): Promise<{
  items: GalleryItem[]
  error?: string
}> {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY
  const categoryFolderId = categoryFolderEnvMap[category]

  if (!apiKey || !categoryFolderId) {
    return {
      items: [],
      error:
        "Gallery is not configured. Missing GOOGLE_DRIVE_API_KEY or per-category folder ID env variable.",
    }
  }

  try {
    const files = await listFolderChildren(categoryFolderId, apiKey)
    if (GALLERY_DEBUG) {
      console.log("[gallery][drive-api][list-files]", {
        category,
        categoryFolderId,
        totalFiles: files.length,
      })
    }
    const imageFiles = files.filter((f) => SUPPORTED_IMAGE_MIME_TYPES.has(f.mimeType.toLowerCase()))

    const items: GalleryItem[] = imageFiles.map((file, index) => ({
      id: file.id,
      title: file.name,
      imageSrc: driveImageUrl(file.id),
      thumbnailSrc: driveThumbnailUrl(file.id),
      alt: file.name,
      date: formatDate(file.modifiedTime),
      driveFileId: file.id,
    }))

    return { items: items.sort((a, b) => a.title.localeCompare(b.title)) }
  } catch (error) {
    return {
      items: [],
      error: error instanceof Error ? error.message : "Unable to load images from Google Drive.",
    }
  }
}
