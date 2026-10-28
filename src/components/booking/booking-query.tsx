"use client";

import { useSearchParams } from "next/navigation";
import { resolveServiceParameter } from "@/lib/booking-state";
import { BookingFlow } from "./booking-flow";

export function BookingQuery() {
  const parameters = useSearchParams();
  const values = parameters.getAll("service");
  const { service, invalid } = resolveServiceParameter(values);
  return <BookingFlow key={JSON.stringify(values)} initialService={service?.slug ?? ""} invalidServiceLink={invalid} />;
}
