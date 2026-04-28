import Link from "next/link";
import Image from "next/image";

interface AppointmentCardProps {
  title: string;
  date: Date;
  timeStart: string;
  timeEnd: string;
  locationName?: string;
  locationAddress?: string;
  locationImageUrl?: string | null;
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
  locationImageUrl,
  bookingUrl,
  description,
}: AppointmentCardProps) {
  const formattedDate = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  const content = (
    <div className="flex flex-col gap-5 md:flex-row md:items-center">
      {locationImageUrl && (
        <div className="relative h-40 w-full flex-shrink-0 overflow-hidden rounded-xl md:h-28 md:w-40">
          <Image
            src={locationImageUrl}
            alt={locationName ?? ""}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 10rem, 100vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <p className="font-label text-[0.7rem] font-medium uppercase tracking-[0.25em] text-primary">
            {formattedDate}
          </p>
          <h3 className="mt-2 font-headline text-xl text-on-surface">
            {title}
          </h3>
          <p className="mt-1.5 font-label text-[0.8rem] font-medium text-on-surface/50">
            {timeStart} – {timeEnd} Uhr
            {locationName && <span className="ml-2">· {locationName}</span>}
          </p>
          {locationAddress && (
            <p className="mt-0.5 font-label text-[0.7rem] font-medium text-on-surface/35">
              {locationAddress}
            </p>
          )}
          {description && (
            <p className="mt-3 font-body text-[0.85rem] font-medium text-on-surface/60">
              {description}
            </p>
          )}
        </div>
        {bookingUrl && (
          <div className="mt-4 flex-shrink-0 md:mt-0">
            <span className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/[0.06] px-6 py-2.5 font-label text-[0.8rem] font-medium text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary group-hover:text-on-primary">
              Anmelden
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const cardClass =
    "group block rounded-2xl border border-transparent bg-surface-container-lowest px-7 py-7 transition-all duration-300 hover:border-outline-variant/30 hover:shadow-sm hover:shadow-black/[0.02] md:px-9";

  if (bookingUrl) {
    return (
      <Link
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {content}
      </Link>
    );
  }

  return <article className={cardClass}>{content}</article>;
}
