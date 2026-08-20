"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideChrome = pathname === "/email-confirm";

  return (
    <>
      {!hideChrome && <Navbar />}
      <main className="grow relative z-10">{children}</main>
      {!hideChrome && <Footer />}
    </>
  );
}
