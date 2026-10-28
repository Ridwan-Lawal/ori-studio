export const bookingSteps = [
  { id: "service", label: "Service", title: "Choose a service." },
  { id: "date", label: "Preferred date", title: "Choose a preferred date." },
  { id: "time", label: "Preferred time", title: "Choose a time of day." },
  { id: "review", label: "Review", title: "Review your preferences." },
] as const;

export const timePreferences = [
  { id: "morning", label: "Morning", description: "Earlier in the day." },
  { id: "afternoon", label: "Afternoon", description: "The middle of the day." },
  { id: "evening", label: "Evening", description: "Later in the day." },
] as const;

export type TimePreference = (typeof timePreferences)[number]["id"];
export const bookingDemoNote = "This is a demo booking experience. Times are preferences, not confirmed availability. No appointment will be submitted.";
export const demoCompletionMessage = "Demo complete — this was a preview. No appointment was booked.";
