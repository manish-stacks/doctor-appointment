"use client";

import { Suspense } from "react";
import AppointmentsPage from "./AppointmentsPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppointmentsPage />
    </Suspense>
  );
}