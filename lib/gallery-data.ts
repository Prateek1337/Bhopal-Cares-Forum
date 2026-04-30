export type GalleryItem = {
  id: string
  title: string
  imageSrc: string
  thumbnailSrc?: string
  alt: string
  date: string
  // Reserved for future Google Drive integration
  driveFileId?: string
}

export type GalleryCategory =
  | "plantation"
  | "cleaning"
  | "cloth"
  | "dustbin"
  | "seedball"

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
    coverImage: "/images/plantation.jpg",
  },
  {
    key: "cleaning",
    title: "Cleanliness Drive Photos",
    subtitle: "Cleanliness campaigns across Bhopal",
    coverImage: "/images/cleaning.JPG",
  },
  {
    key: "cloth",
    title: "Donation Photos",
    subtitle: "Community support through donation",
    coverImage: "/images/upaharam.jpg",
  },
  {
    key: "dustbin",
    title: "Dustbin Installation",
    subtitle: "Dustbin placement initiatives in public spaces",
    coverImage: "/images/plantation.jpg",
  },
  {
    key: "seedball",
    title: "SeedBall Making",
    subtitle: "Preparing seed balls for green restoration drives",
    coverImage: "/images/plantation.jpg",
  },
]

export const galleryByCategory: Record<GalleryCategory, GalleryItem[]> = {
  plantation: [
    {
      id: "plantation-1",
      title: "Neighborhood Plantation",
      imageSrc: "/images/plantation.jpg",
      alt: "Volunteers planting saplings",
      date: "Feb 2026",
    },
    {
      id: "plantation-2",
      title: "Green Belt Expansion",
      imageSrc: "/images/plantation.jpg",
      alt: "Community members watering newly planted trees",
      date: "Oct 2025",
    },
  ],
  cleaning: [
    {
      id: "cleaning-1",
      title: "Morning Lake Cleanup",
      imageSrc: "/images/cleaning.JPG",
      alt: "Volunteers cleaning a public area",
      date: "Jan 2026",
    },
    {
      id: "cleaning-2",
      title: "Street Cleanliness Campaign",
      imageSrc: "/images/cleaning.JPG",
      alt: "Team members holding cleaning tools",
      date: "Nov 2025",
    },
  ],
  cloth: [
    {
      id: "donation-1",
      title: "Winter Donation",
      imageSrc: "/images/upaharam.jpg",
      alt: "Donation drive in the community",
      date: "Dec 2025",
    },
    {
      id: "donation-2",
      title: "Community Support Drive",
      imageSrc: "/images/upaharam.jpg",
      alt: "Volunteers organizing donated clothes",
      date: "Sep 2025",
    },
  ],
  dustbin: [
    {
      id: "dustbin-1",
      title: "Dustbin Installation Drive",
      imageSrc: "/images/plantation.jpg",
      alt: "Volunteers installing public dustbins",
      date: "Mar 2026",
    },
    {
      id: "dustbin-2",
      title: "Clean Streets Initiative",
      imageSrc: "/images/plantation.jpg",
      alt: "Newly installed dustbins in the neighborhood",
      date: "Dec 2025",
    },
  ],
  seedball: [
    {
      id: "seedball-1",
      title: "SeedBall Workshop",
      imageSrc: "/images/plantation.jpg",
      alt: "Community members preparing seed balls",
      date: "Feb 2026",
    },
    {
      id: "seedball-2",
      title: "Green Future Campaign",
      imageSrc: "/images/plantation.jpg",
      alt: "Seed balls ready for plantation activity",
      date: "Nov 2025",
    },
  ],
}
