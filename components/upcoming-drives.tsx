import { Calendar, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const drives = [
  {
    title: "Upper Lake Shoreline Cleanup",
    type: "Cleaning",
    date: "March 10, 2026",
    time: "7:00 AM - 11:00 AM",
    location: "Upper Lake Promenade, Bhopal",
    description:
      "Join us for a morning cleanup along the scenic Upper Lake shore, restoring the lakeside to its natural beauty.",
  },
  {
    title: "City Park Plantation",
    type: "Plantation",
    date: "March 22, 2026",
    time: "8:00 AM - 12:00 PM",
    location: "Near Van Vihar, Bhopal",
    description:
      "Help us plant 500 saplings in and around the city park area to create a lush green corridor.",
  },
  {
    title: "Winter Cloth Distribution",
    type: "Donation",
    date: "April 5, 2026",
    time: "10:00 AM - 3:00 PM",
    location: "Chowk Bazaar, Old Bhopal",
    description:
      "We are collecting and distributing clothes to underprivileged families in the old city areas of Bhopal.",
  },
]

function getBadgeClass(type: string) {
  switch (type) {
    case "Cleaning":
      return "bg-accent/10 text-accent-foreground border-accent/20 hover:bg-accent/10"
    case "Plantation":
      return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10"
    case "Donation":
      return "bg-muted text-muted-foreground border-border hover:bg-muted"
    default:
      return ""
  }
}

export function UpcomingDrives() {
  return (
    <section id="drives" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Get Involved
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Upcoming Drives
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Be a part of the change. Join our next drive and make a difference in Bhopal.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {drives.map((drive) => (
            <article
              key={drive.title}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex items-center justify-between bg-muted/50 px-6 py-4">
                <Badge
                  variant="outline"
                  className={getBadgeClass(drive.type)}
                >
                  {drive.type}
                </Badge>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-card-foreground">
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
