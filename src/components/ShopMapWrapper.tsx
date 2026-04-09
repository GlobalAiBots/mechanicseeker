"use client";
import dynamic from "next/dynamic";
const ShopMap = dynamic(() => import("@/components/ShopMap"), { ssr: false });
interface Pin { id: string; name: string; lat: number; lng: number; city?: string; state?: string; }
export default function ShopMapWrapper({ shops, center, zoom, height }: { shops: Pin[]; center?: [number, number]; zoom?: number; height?: string }) {
  return <ShopMap shops={shops} center={center} zoom={zoom} height={height} />;
}
