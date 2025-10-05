"use client";

import dynamic from "next/dynamic";

const LazyMobileMenu = dynamic(() =>
  import("@/components/MobileMenu").then((mod) => ({ default: mod.MobileMenu })), 
  { ssr: false }
);

export default function LazyMobileMenuWrapper() {
  return <LazyMobileMenu />;
}
