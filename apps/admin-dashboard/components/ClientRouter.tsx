"use client";

import { BrowserRouter } from "react-router-dom";
import type { PropsWithChildren } from "react";

export default function ClientRouter({
  children,
}: PropsWithChildren<{ children: React.ReactNode }>) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
