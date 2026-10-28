"use client";

import { useEffect, useReducer, useRef } from "react";
import { bookingSteps, demoCompletionMessage } from "@/content/booking";
import { conceptDisclosure } from "@/content/site";
import { serviceBySlug, type ServiceSlug } from "@/content/services";
import { bookingReducer, initialBookingState } from "@/lib/booking-state";
import { localDateString } from "@/lib/booking-date";
import { useLocalDate } from "@/hooks/use-local-date";
import { BookingProgress } from "./booking-progress";
import { PreferredDate, PreferredTime, ReviewPreferences, ServiceSelection } from "./booking-steps";
import styles from "./booking.module.css";

export function BookingFlow({ initialService, invalidServiceLink }: { initialService: ServiceSlug | ""; invalidServiceLink: boolean }) {
  const [state, dispatch] = useReducer(bookingReducer, initialService, initialBookingState);
  const today = useLocalDate();
  const heading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const stage = bookingSteps.find((item) => item.id === state.step);
  const index = bookingSteps.findIndex((item) => item.id === state.step);
  const selectedService = serviceBySlug(state.details.serviceSlug);

  useEffect(() => {
    if (!state.focus) return;
    if (state.focus.target === "heading") heading.current?.focus();
    else {
      const selector = state.focus.target === "date" ? "#preferred-date" : state.focus.target === "service" ? 'input[name="service"]' : 'input[name="preferred-time"]';
      form.current?.querySelector<HTMLInputElement>(selector)?.focus();
    }
  }, [state.focus]);

  return (
    <section aria-label="Appointment request demonstration" className={styles.flow}>
      <BookingProgress step={state.step} />
      <div className={styles.flowGrid}>
        <div key={state.step} className={styles.stage}>
          <p className={`text-eyebrow ${styles.stageLabel}`} role="status">{stage ? `Step ${index + 1} of 4 · ${stage.label}` : "Preview complete"}</p>
          <h2 id="booking-stage-title" ref={heading} tabIndex={-1} className={`text-subheading ${styles.stageTitle}`}>{stage?.title ?? "Demo complete."}</h2>
          {state.step === "complete" ? (
            <div className={styles.completion}>
              <p className="text-intro">{demoCompletionMessage}</p>
              <p>No appointment was created. Completing this demo did not transmit or save your selections.</p>
              <button className="button" type="button" onClick={() => dispatch({ type: "reset" })}>Start again</button>
              <p className="disclosure">{conceptDisclosure}</p>
            </div>
          ) : (
            <form ref={form} noValidate onSubmit={(event) => { event.preventDefault(); dispatch({ type: "advance", today: localDateString() }); }} aria-labelledby="booking-stage-title">
              {state.step === "service" && <>
                {invalidServiceLink && !state.details.serviceSlug && <p className={styles.linkNotice}>That service link isn’t recognised. Choose a service below to begin.</p>}
                <ServiceSelection value={state.details.serviceSlug} error={state.error?.field === "service" ? state.error.message : undefined} onChange={(value) => dispatch({ type: "service", value })} />
              </>}
              {state.step === "date" && <PreferredDate value={state.details.preferredDate} today={today} error={state.error?.field === "date" ? state.error.message : undefined} onChange={(value) => dispatch({ type: "date", value })} />}
              {state.step === "time" && <PreferredTime value={state.details.preferredTime} error={state.error?.field === "time" ? state.error.message : undefined} onChange={(value) => dispatch({ type: "time", value })} />}
              {state.step === "review" && <ReviewPreferences details={state.details} onEdit={(step) => dispatch({ type: "edit", step })} />}
              <div className={styles.actions}>
                {index > 0 && <button type="button" className={styles.backButton} onClick={() => dispatch({ type: "back" })}>Back</button>}
                <button type="submit" className="button">{state.step === "review" ? "Complete demo" : state.step === "time" ? "Review request" : "Continue"}</button>
              </div>
              <p className={`disclosure ${styles.endDisclosure}`}>{conceptDisclosure}</p>
            </form>
          )}
        </div>
        <aside className={styles.aside} aria-label="About the preview">
          <p className="text-eyebrow">Time, considered.</p>
          <h2 className="text-subheading">A little space for your next style.</h2>
          <p>Choose a service and your preferences, then review the demo request.</p>
          {selectedService && <p className={styles.serviceNote}><span className="text-eyebrow">Your service</span><strong>{selectedService.name}</strong></p>}
          <p className={styles.privacyNote}>No personal information is requested. Your selections are held only in this page’s memory. Nothing is submitted or saved.</p>
        </aside>
      </div>
    </section>
  );
}
