export type GalleryItem = {
  id: string
  title: string
  imageSrc: string
  alt: string
  date: string
  // Reserved for future Google Drive integration
  driveFileId?: string
}

export type GalleryCategory = "plantation" | "cleaning" | "cloth"

export const categoryMeta: {
  key: GalleryCategory
  title: string
  subtitle: string
  coverImage: string
}[] = [
  {
    key: "plantation",
    title: "Plantation Photos",
    subtitle: "Tree plantation drives and green initiatives",
    coverImage: "/images/plantation-drive.jpg",
  },
  {
    key: "cleaning",
    title: "Cleaning Drive Photos",
    subtitle: "Cleanliness campaigns across Bhopal",
    coverImage: "/images/cleaning-drive.jpg",
  },
  {
    key: "cloth",
    title: "Cloth Donation Photos",
    subtitle: "Community support through cloth donation",
    coverImage: "/images/cloth-donation.jpg",
  },
]

export const galleryByCategory: Record<GalleryCategory, GalleryItem[]> = {
  plantation: [
    {
      id: "plantation-1",
      title: "Neighborhood Plantation",
      imageSrc: "/images/plantation-drive.jpg",
      alt: "Volunteers planting saplings",
      date: "Feb 2026",
    },
    {
      id: "plantation-2",
      title: "Green Belt Expansion",
      imageSrc: "/images/plantation-drive.jpg",
      alt: "Community members watering newly planted trees",
      date: "Oct 2025",
    },
  ],
  cleaning: [
    {
      id: "cleaning-1",
      title: "Morning Lake Cleanup",
      imageSrc: "/images/cleaning-drive.jpg",
      alt: "Volunteers cleaning a public area",
      date: "Jan 2026",
    },
    {
      id: "cleaning-2",
      title: "Street Cleanliness Campaign",
      imageSrc: "/images/cleaning-drive.jpg",
      alt: "Team members holding cleaning tools",
      date: "Nov 2025",
    },
  ],
  cloth: [
    {
      id: "donation-1",
      title: "Winter Cloth Donation",
      imageSrc: "/images/cloth-donation.jpg",
      alt: "Cloth donation drive in the community",
      date: "Dec 2025",
    },
    {
      id: "donation-2",
      title: "Community Support Drive",
      imageSrc: "/images/cloth-donation.jpg",
      alt: "Volunteers organizing donated clothes",
      date: "Sep 2025",
    },
  ],
}
