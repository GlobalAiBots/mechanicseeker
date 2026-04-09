import Link from "next/link";
export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">{"🔧"}</p>
      <h1 className="font-[Cabin] text-3xl font-bold text-[#1A1A1A] mb-3">Shop Not Found</h1>
      <p className="text-gray-500 mb-8">We couldn&apos;t find that page &mdash; but we&apos;ve got 51,000+ auto repair shops waiting for you.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="bg-[#E67E22] hover:bg-[#d35400] text-white font-bold px-6 py-3 rounded-lg transition">Search Shops</Link>
        <Link href="/shops" className="border-2 border-[#2C3E50] text-[#2C3E50] hover:bg-[#2C3E50] hover:text-white font-bold px-6 py-3 rounded-lg transition">Browse All</Link>
      </div>
    </div>
  );
}
