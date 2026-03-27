import Link from "next/link";

interface AppointmentCardProps {
  title: string;
  date: Date;
  timeStart: string;
  timeEnd: string;
  locationName?: string;
  locationAddress?: string;
  bookingUrl?: string | null;
  description?: string | null;
}

export default function AppointmentCard({
  title,
  date,
  timeStart,
  timeEnd,
  locationName,
  locationAddress,
  bookingUrl,
  description,
}: AppointmentCardProps) {
  const formattedDate = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  return (
    <article className="group rounded-xl bg-surface-container-low px-6 py-6 transition-colors hover:bg-surface-container md:px-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <p className="font-label text-xs uppercase tracking-widest text-primary">
            {formattedDate}
          </p>
          <h3 className="mt-1 font-headline text-lg text-on-surface">
            {title}
          </h3>
          <p className="mt-1 font-label text-sm text-on-surface/60">
            {timeStart} – {timeEnd} Uhr
            {locationName && <span className="ml-2">· {locationName}</span>}
          </p>
          {locationAddress && (
            <p className="mt-0.5 font-label text-xs text-on-surface/40">
              {locationAddress}
            </p>
          )}
          {description && (
            <p className="mt-2 font-body text-sm text-on-surface/70">
              {description}
            </p>
          )}
        </div>
        {bookingUrl && (
          <div className="mt-3 md:mt-0">
            <Link
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl bg-primary px-5 py-2.5 font-label text-sm font-medium text-on-primary transition-opacity hover:opacity-90"
            >
              Anmelden
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
