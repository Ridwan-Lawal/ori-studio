import { serviceBySlug, type ServiceSlug } from "@/content/services";
import { bookingSteps, timePreferences, type TimePreference } from "@/content/booking";
import { isCalendarDate } from "@/lib/booking-date";

export type BookingStep = (typeof bookingSteps)[number]["id"] | "complete";
export type BookingField = "service" | "date" | "time";
export type BookingDetails = {
  serviceSlug: ServiceSlug | "";
  preferredDate: string;
  preferredTime: TimePreference | "";
};
export type BookingError = { field: BookingField; message: string };
export type BookingState = {
  step: BookingStep;
  details: BookingDetails;
  error: BookingError | null;
  focus: { sequence: number; target: BookingField | "heading" } | null;
};
export type BookingAction =
  | { type: "service"; value: string }
  | { type: "date"; value: string }
  | { type: "time"; value: string }
  | { type: "advance"; today: string }
  | { type: "back" }
  | { type: "edit"; step: BookingField }
  | { type: "reset" };

export function resolveServiceParameter(values: readonly string[]) {
  if (values.length === 0) return { service: undefined, invalid: false };
  const service = values.length === 1 ? serviceBySlug(values[0]) : undefined;
  return { service, invalid: !service };
}

export function initialBookingState(serviceSlug: ServiceSlug | "" = ""): BookingState {
  return { step: "service", details: { serviceSlug, preferredDate: "", preferredTime: "" }, error: null, focus: null };
}

export function validateBooking(details: BookingDetails, today: string, through: BookingField = "time"): BookingError | null {
  if (!serviceBySlug(details.serviceSlug)) return { field: "service", message: "Choose a service to continue." };
  if (through === "service") return null;
  if (!details.preferredDate) return { field: "date", message: "Choose a preferred date to continue." };
  if (!isCalendarDate(details.preferredDate)) return { field: "date", message: "Choose a valid calendar date." };
  if (!isCalendarDate(today) || details.preferredDate < today) return { field: "date", message: "Choose today or a later date." };
  if (through === "date") return null;
  if (!timePreferences.some((preference) => preference.id === details.preferredTime)) return { field: "time", message: "Choose Morning, Afternoon or Evening to continue." };
  return null;
}

function nextFocus(state: BookingState, target: BookingField | "heading") {
  return { sequence: (state.focus?.sequence ?? 0) + 1, target };
}

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "service":
      return { ...state, details: { ...state.details, serviceSlug: serviceBySlug(action.value)?.slug ?? "" }, error: state.error?.field === "service" ? null : state.error };
    case "date":
      return { ...state, details: { ...state.details, preferredDate: action.value }, error: state.error?.field === "date" ? null : state.error };
    case "time":
      return { ...state, details: { ...state.details, preferredTime: timePreferences.find((item) => item.id === action.value)?.id ?? "" }, error: state.error?.field === "time" ? null : state.error };
    case "advance": {
      if (state.step === "complete") return state;
      const through = state.step === "service" ? "service" : state.step === "date" ? "date" : "time";
      const error = validateBooking(state.details, action.today, through);
      if (error) return { ...state, step: error.field, error, focus: nextFocus(state, error.field) };
      const current = bookingSteps.findIndex((step) => step.id === state.step);
      return { ...state, step: bookingSteps[current + 1]?.id ?? "complete", error: null, focus: nextFocus(state, "heading") };
    }
    case "back": {
      const current = bookingSteps.findIndex((step) => step.id === state.step);
      if (current < 1) return state;
      return { ...state, step: bookingSteps[current - 1].id, error: null, focus: nextFocus(state, "heading") };
    }
    case "edit":
      if (state.step !== "review") return state;
      return { ...state, step: action.step, error: null, focus: nextFocus(state, "heading") };
    case "reset":
      return { ...initialBookingState(), focus: nextFocus(state, "heading") };
  }
}
