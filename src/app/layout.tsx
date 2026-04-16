import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import StatesDropdown from "@/components/StatesDropdown";
import CletusWidget from "@/components/CletusWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "MechanicSeeker | Find Auto Repair Shops Near You — 51,000+ Shops",
  description: "Find auto repair shops across the United States. 51,000+ mechanics, tire shops, body shops, and quick lube locations with reviews, services, and contact info. Free.",
  keywords: "mechanic near me, auto repair shop, car repair, brake shop, tire shop, oil change near me",
  openGraph: { title: "MechanicSeeker | Find Auto Repair Shops Near You", description: "51,000+ auto repair shops across the US. Find trusted mechanics, tire shops, and body shops.", url: "https://mechanicseeker.com", siteName: "MechanicSeeker", type: "website" },
  twitter: { card: "summary", title: "MechanicSeeker | Find Auto Repair Shops", description: "51,000+ auto repair shops across the US." },
  alternates: { canonical: "https://mechanicseeker.com" },
  other: { "google-adsense-account": "ca-pub-4822220549367368", "impact-site-verification": "5e24b07b-ec3d-4add-8aaf-3b4f2f385422" },
};

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-[Cabin]">
          <span className="text-2xl">{"🔧"}</span>
          <span className="text-[#1A1A1A]">Mechanic<span className="text-[#E67E22]">Seeker</span></span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
          <StatesDropdown />
          <Link href="/map" className="text-gray-500 hover:text-[#2C3E50] transition">Map</Link>
          <Link href="/blog" className="text-gray-500 hover:text-[#2C3E50] transition hidden sm:block">Blog</Link>
          <Link href="/about" className="text-gray-500 hover:text-[#2C3E50] transition hidden sm:block">About</Link>
          <Link href="/for-businesses" className="text-[#E67E22] font-bold hover:text-[#d35400] transition hidden sm:block">For Businesses</Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1A2332] border-t border-[#2C3E50] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-white/50">
          <div>
            <p className="font-bold text-white mb-2 font-[Cabin]">{"🔧"} MechanicSeeker</p>
            <p>The most complete auto repair directory in America. 51,000+ shops.</p>
          </div>
          <div>
            <p className="font-bold text-white/70 mb-2">Links</p>
            <div className="flex flex-col gap-1">
              <Link href="/" className="text-white/40 hover:text-white transition">Home</Link>
              <Link href="/shops" className="text-white/40 hover:text-white transition">Browse Shops</Link>
              <Link href="/blog" className="text-white/40 hover:text-white transition">Blog</Link>
              <Link href="/about" className="text-white/40 hover:text-white transition">About</Link>
              <Link href="/claim" className="text-[#E67E22] hover:text-white transition font-semibold">Claim Your Listing</Link>
              <Link href="/privacy" className="text-white/40 hover:text-white transition">Privacy</Link>
              <Link href="/terms" className="text-white/40 hover:text-white transition">Terms</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-white/70 mb-2">Know a shop we missed?</p>
            <a href="mailto:hello@mechanicseeker.com" className="text-[#E67E22] hover:text-white transition">hello@mechanicseeker.com</a>
          </div>
          <div>
            <p className="font-bold text-white/70 mb-2">Our Network</p>
            <div className="flex flex-col gap-1">
              <a href="https://rampseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">RampSeeker</a>
              <a href="https://pierseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">PierSeeker</a>
              <a href="https://barkseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">BarkSeeker</a>
              <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">MarinaSeeker</a>
              <a href="https://mechanicseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">MechanicSeeker</a>
              <a href="https://babymydog.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">BabyMyDog</a>
              <a href="https://askcletus.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">CLETUS AI Chat</a>
              <a href="https://getcletus.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">CLETUS AI Voice</a>
              <a href="https://grandlakeai.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">Grand Lake AI</a>
              <a href="https://globalaibots.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">Global AI Bots</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/30">
          <span>&copy; {new Date().getFullYear()} MechanicSeeker. All rights reserved. A <a href="https://globalaibots.com" target="_blank" className="text-[#E67E22]/70 hover:text-white transition">Global AI Bots</a> project.</span>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Source_Sans_3'] antialiased min-h-screen flex flex-col" style={{ background: "#FAF8F5" }}>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4822220549367368" crossOrigin="anonymous" strategy="afterInteractive" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-VGQRDXWZXJ" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-VGQRDXWZXJ');`}</Script>
        <a href="/shops" className="block w-full bg-[#E67E22] text-white text-center py-2 text-xs sm:text-sm font-medium hover:bg-[#d35400] transition">
          {"🆕"} MechanicSeeker just launched! Find trusted auto repair shops near you &rarr;
        </a>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CletusWidget />
      </body>
    </html>
  );
}
