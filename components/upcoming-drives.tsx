import { Calendar, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ArchDivider } from "@/components/bhopali-motifs"

const drives = [
  {
    title: "Upper Lake Shoreline Cleanup",
    type: "Cleaning",
    date: "March 10, 2026",
    time: "7:00 AM - 11:00 AM",
    location: "Upper Lake Promenade, Bhopal",
    description:
      "Join us for a morning cleanup along the iconic Bada Talab shore, restoring the lakeside to its natural beauty.",
  },
  {
    title: "Gohar Mahal Green Corridor",
    type: "Plantation",
    date: "March 22, 2026",
    time: "8:00 AM - 12:00 PM",
    location: "Near Gohar Mahal, Bhopal",
    description:
      "Help us plant 500 saplings near the historic Gohar Mahal to create a lush green corridor connecting heritage to nature.",
  },
  {
    title: "Old City Cloth Distribution",
    type: "Donation",
    date: "April 5, 2026",
    time: "10:00 AM - 3:00 PM",
    location: "Chowk Bazaar, Old Bhopal",
    description:
      "We are collecting and distributing clothes in the lanes of old Bhopal, near the historic Chowk Bazaar and Jama Masjid.",
  },
]

function getBadgeClass(type: string) {
  switch (type) {
    case "Cleaning":
      return "bg-accent/10 text-accent border-accent/20 hover:bg-accent/10"
    case "Plantation":
      return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10"
    case "Donation":
      return "bg-[#8b5e3c]/10 text-[#8b5e3c] border-[#8b5e3c]/20 hover:bg-[#8b5e3c]/10"
    default:
      return ""
  }
}

export function UpcomingDrives() {
  return (
    <section id="drives" className="relative bg-secondary py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Get Involved
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Upcoming Drives
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Be a part of the change. Join our next drive across {"Bhopal's"} historic landmarks and lakes.
          </p>
        </div>

        <ArchDivider className="mx-auto mt-10 max-w-xs" />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {drives.map((drive) => (
            <article
              key={drive.title}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
            >
              {/* Arch header band */}
              <div className="relative flex items-center justify-center bg-primary/5 px-6 pt-6 pb-4">
                <svg viewBox="0 0 200 50" className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 text-primary/10" fill="none" aria-hidden="true">
                  <path d="M10 50 V20 Q10 2 100 2 Q190 2 190 20 V50" stroke="currentColor" strokeWidth="2" />
                </svg>
                <Badge
                  variant="outline"
                  className={`relative z-10 ${getBadgeClass(drive.type)}`}
                >
                  {drive.type}
                </Badge>
              </div>

              <div className="flex flex-1 flex-col p-6 pt-4">
                <h3 className="text-lg font-bold text-card-foreground font-serif">
                  {drive.title}
                </h3>

                <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                  {drive.description}
                </p>

                <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="size-4 text-primary" />
                    <span>{drive.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4 text-primary" />
                    <span>{drive.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    <span>{drive.location}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
