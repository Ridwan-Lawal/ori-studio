import { serviceCategories, services, type ServiceSlug } from "@/content/services";
import { timePreferences, type TimePreference } from "@/content/booking";
import type { BookingDetails, BookingField } from "@/lib/booking-state";
import { formatPreferredDate } from "@/lib/booking-date";
import styles from "./booking.module.css";

export function ServiceSelection({ value, error, onChange }: { value: ServiceSlug | ""; error?: string; onChange: (value: ServiceSlug) => void }) {
  return (
    <>
      <p id="service-help" className={styles.fieldHelp}>Choose one service for the preview. You can change it before completing the demo.</p>
      {error && <p id="service-error" className={styles.fieldError} role="alert">{error}</p>}
      <div role="radiogroup" aria-labelledby="booking-stage-title" aria-describedby={`service-help${error ? " service-error" : ""}`} aria-invalid={Boolean(error)}>
        {serviceCategories.map((category) => (
          <fieldset className={styles.serviceCategory} key={category.id}>
            <legend>{category.name}</legend>
            {services.filter((service) => service.category === category.id).map((service) => (
              <label className={styles.optionRow} key={service.slug} data-selected={value === service.slug}>
                <input type="radio" name="service" value={service.slug} checked={value === service.slug} onChange={() => onChange(service.slug)} required aria-describedby={error ? "service-error" : undefined} />
                <span className={styles.optionCopy}><span className={styles.optionTitle}>{service.name}</span><span className={styles.optionDescription}>{service.summary}</span></span>
                {value === service.slug && <span className={styles.selectedLabel}>Selected</span>}
              </label>
            ))}
          </fieldset>
        ))}
      </div>
    </>
  );
}

export function PreferredDate({ value, today, error, onChange }: { value: string; today: string; error?: string; onChange: (value: string) => void }) {
  return (
    <div className={styles.dateField}>
      <label htmlFor="preferred-date">Preferred date</label>
      <p id="date-help" className={styles.fieldHelp}>Choose today or a later date. This is a preference, not confirmed availability.</p>
      <input id="preferred-date" name="preferred-date" type="date" value={value} min={today || undefined} required disabled={!today} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={`date-help${error ? " date-error" : ""}`} />
      {error && <p id="date-error" className={styles.fieldError} role="alert">{error}</p>}
    </div>
  );
}

export function PreferredTime({ value, error, onChange }: { value: TimePreference | ""; error?: string; onChange: (value: TimePreference) => void }) {
  return (
    <fieldset role="radiogroup" aria-invalid={Boolean(error)} className={styles.timeGroup} aria-describedby={`time-help${error ? " time-error" : ""}`}>
      <legend className="sr-only">Preferred time of day</legend>
      <p id="time-help" className={styles.fieldHelp}>Morning, Afternoon and Evening are illustrative preferences, not available appointment slots.</p>
      {error && <p id="time-error" className={styles.fieldError} role="alert">{error}</p>}
      {timePreferences.map((preference) => (
        <label className={styles.optionRow} key={preference.id} data-selected={value === preference.id}>
          <input type="radio" name="preferred-time" value={preference.id} checked={value === preference.id} onChange={() => onChange(preference.id)} required aria-describedby={error ? "time-error" : "time-help"} />
          <span className={styles.optionCopy}><span className={styles.optionTitle}>{preference.label}</span><span className={styles.optionDescription}>{preference.description}</span></span>
          {value === preference.id && <span className={styles.selectedLabel}>Selected</span>}
        </label>
      ))}
    </fieldset>
  );
}

export function ReviewPreferences({ details, onEdit }: { details: BookingDetails; onEdit: (step: BookingField) => void }) {
  const service = services.find((item) => item.slug === details.serviceSlug);
  const time = timePreferences.find((item) => item.id === details.preferredTime);
  const items = [
    { field: "service" as const, label: "Service", value: service?.name ?? "Not chosen" },
    { field: "date" as const, label: "Preferred date", value: formatPreferredDate(details.preferredDate) },
    { field: "time" as const, label: "Preferred time", value: time?.label ?? "Not chosen" },
  ];
  return (
    <>
      <p className={styles.fieldHelp}>This is a portfolio demonstration. Review your preferences before completing the demo.</p>
      <dl className={styles.reviewList}>
        {items.map((item) => (
          <div key={item.field}>
            <dt>{item.label}</dt>
            <dd><span>{item.value}</span>
            <button type="button" className={styles.editButton} onClick={() => onEdit(item.field)} aria-label={`Edit ${item.label.toLowerCase()}`}>Edit</button></dd>
          </div>
        ))}
      </dl>
      <p className={styles.reviewNotice}>Completing this demo only previews the request. No appointment will be submitted.</p>
    </>
  );
}
