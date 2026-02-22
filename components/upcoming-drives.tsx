import { Calendar, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const drives = [
  {
    title: "Upper Lake Cleanup Drive",
    type: "Cleaning",
    date: "March 10, 2026",
    time: "7:00 AM - 11:00 AM",
    location: "Upper Lake, Bhopal",
    description:
      "Join us for a morning lakeside cleanup to restore the beauty of Bhopal's iconic Upper Lake.",
  },
  {
    title: "Green Corridor Plantation",
    type: "Plantation",
    date: "March 22, 2026",
    time: "8:00 AM - 12:00 PM",
    location: "Hoshangabad Road, Bhopal",
    description:
      "Help us plant 500 saplings along Hoshangabad Road to create a green corridor for the city.",
  },
  {
    title: "Winter Cloth Distribution",
    type: "Donation",
    date: "April 5, 2026",
    time: "10:00 AM - 3:00 PM",
    location: "Jama Masjid Area, Old Bhopal",
    description:
      "We are collecting and distributing clothes to underprivileged families in the Old City.",
  },
]

function getBadgeClass(type: string) {
  switch (type) {
    case "Cleaning":
      return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10"
    case "Plantation":
      return "bg-primary/15 text-primary border-primary/25 hover:bg-primary/15"
    case "Donation":
      return "bg-accent/15 text-accent-foreground border-accent/25 hover:bg-accent/15"
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
            Check out our upcoming events and be a part of the change.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {drives.map((drive) => (
            <article
              key={drive.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <Badge
                variant="outline"
                className={`w-fit ${getBadgeClass(drive.type)}`}
              >
                {drive.type}
              </Badge>

              <h3 className="mt-4 text-lg font-bold text-card-foreground">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
