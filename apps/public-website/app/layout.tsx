import "./globals.css";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata = {
  title: {
    default: "UPCHAR | Connected healthcare platform",
    template: "%s | UPCHAR",
  },
  description:
    "UPCHAR connects patients, doctors, and hospitals with telemedicine, appointments, records, pharmacy, and billing.",
  metadataBase: new URL("https://www.upchar.health"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
