import type { GalleryCategory, GalleryItem } from "@/lib/gallery-data"

type DriveFile = {
  id: string
  name: string
  mimeType: string
  modifiedTime?: string
}

const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3/files"

const categoryFolderMap: Record<GalleryCategory, string> = {
  plantation: "Plantation",
  cleaning: "Cleanliness",
  cloth: "Donation",
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchWithRetry(url: string, retries = 2): Promise<Response> {
  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, { cache: "no-store" })
      if (!response.ok) {
        const body = await response.text()
        throw new Error(`Drive API ${response.status}: ${body}`)
      }
      return response
    } catch (error) {
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
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" })
}

export function driveImageUrl(fileId: string) {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY
  if (!apiKey) {
    return ""
  }
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`
}

async function listFolderChildren(parentId: string, apiKey: string) {
  const q = `'${parentId}' in parents and trashed=false`
  const fields = "files(id,name,mimeType,modifiedTime)"
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
  const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID

  if (!apiKey || !rootFolderId) {
    return { items: [], error: "Gallery is not configured. Missing Drive environment variables." }
  }

  try {
    const rootChildren = await listFolderChildren(rootFolderId, apiKey)
    const expectedFolder = categoryFolderMap[category].toLowerCase()
    const categoryFolder = rootChildren.find(
      (f) => f.mimeType === "application/vnd.google-apps.folder" && f.name.toLowerCase() === expectedFolder
    )

    if (!categoryFolder) {
      return { items: [], error: `Could not find '${categoryFolderMap[category]}' folder in Drive.` }
    }

    const files = await listFolderChildren(categoryFolder.id, apiKey)
    const imageFiles = files.filter((f) => f.mimeType.startsWith("image/"))

    const items: GalleryItem[] = imageFiles.map((file, index) => ({
      id: file.id,
      title: file.name,
      imageSrc: driveImageUrl(file.id),
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
