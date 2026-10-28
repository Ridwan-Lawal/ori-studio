import { bookingSteps } from "@/content/booking";
import type { BookingStep } from "@/lib/booking-state";
import styles from "./booking.module.css";

export function BookingProgress({ step }: { step: BookingStep }) {
  const current = step === "complete" ? bookingSteps.length : bookingSteps.findIndex((item) => item.id === step);
  return (
    <nav aria-label="Booking preview progress" className={styles.progress}>
      <ol>
        {bookingSteps.map((item, index) => (
          <li key={item.id} aria-current={index === current ? "step" : undefined} data-state={index === current ? "current" : index < current ? "done" : "upcoming"}>
            <span className={styles.progressNumber} aria-hidden="true">0{index + 1}</span>
            <span>{item.label}</span>
            {index < current && <span className="sr-only"> — completed</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
