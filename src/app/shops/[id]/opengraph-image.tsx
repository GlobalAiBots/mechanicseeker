import { ImageResponse } from "next/og";
import { getShopById, stateList } from "@/data/all-mechanics";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const shop = getShopById(params.id);
  const stateName = shop ? (stateList.find(s => s.code === shop.state)?.name || shop.state) : "";
  const title = shop?.name || "Auto Repair Shop";
  const subtitle = shop ? `${shop.city ? shop.city + ", " : ""}${stateName}` : "";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #E67E22, #D35400)", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.5)", marginBottom: 16, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const }}>MechanicSeeker</div>
        <div style={{ fontSize: 48, fontWeight: 900, color: "white", textAlign: "center" as const, maxWidth: 900, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.7)", marginTop: 16 }}>{subtitle}</div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", marginTop: 12 }}>Auto Repair · Ratings · Directions</div>
      </div>
    ),
    { ...size }
  );
}
