import "./globals.css";

export const metadata = {
  title: "UPCHAR | Digital Healthcare Platform",
  description: "Enterprise healthcare platform for patients, doctors, and hospitals.",
  metadataBase: new URL("https://www.upchar.health"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
