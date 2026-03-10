"use client";

import { Suspense } from "react";
import GoogleSuccess from "./GoogleSuccess";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleSuccess />
    </Suspense>
  );
}