"""Fast compile: skip O(n^2) dedup, use grid-based approach."""
import json
import os
import re
import time
import math
import requests

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")

STATE_ABBREVS = {
    "alabama":"AL","alaska":"AK","arizona":"AZ","arkansas":"AR","california":"CA",
    "colorado":"CO","connecticut":"CT","delaware":"DE","florida":"FL","georgia":"GA",
    "hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA","kansas":"KS",
    "kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD","massachusetts":"MA",
    "michigan":"MI","minnesota":"MN","mississippi":"MS","missouri":"MO","montana":"MT",
    "nebraska":"NE","nevada":"NV","new hampshire":"NH","new jersey":"NJ","new mexico":"NM",
    "new york":"NY","north carolina":"NC","north dakota":"ND","ohio":"OH","oklahoma":"OK",
    "oregon":"OR","pennsylvania":"PA","rhode island":"RI","south carolina":"SC",
    "south dakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT",
    "virginia":"VA","washington":"WA","west virginia":"WV","wisconsin":"WI","wyoming":"WY",
}

PARTS_STORES = {"autozone", "o'reilly", "advance auto", "napa auto parts", "carquest",
                "pepboys parts", "auto parts"}
CHAINS = {
    "jiffy lube": "Jiffy Lube", "midas": "Midas", "meineke": "Meineke",
    "firestone": "Firestone", "pep boys": "Pep Boys", "aamco": "AAMCO",
    "maaco": "Maaco", "valvoline": "Valvoline", "take 5": "Take 5",
    "goodyear": "Goodyear", "ntb": "NTB", "christian brothers": "Christian Brothers",
    "caliber collision": "Caliber Collision", "service king": "Service King",
    "big o tires": "Big O Tires", "les schwab": "Les Schwab",
    "discount tire": "Discount Tire", "grease monkey": "Grease Monkey",
    "express oil": "Express Oil", "monro": "Monro", "safelite": "Safelite",
}


def detect_brand(name):
    n = name.lower()
    for pattern, brand in CHAINS.items():
        if pattern in n:
            return brand
    return ""


def is_parts_store(name):
    n = name.lower()
    for store in PARTS_STORES:
        if store in n:
            if "napa" in n and ("care" in n or "repair" in n or "service" in n):
                return False
            return True
    return False


def classify_services(name, tags):
    services = set()
    n = name.lower()
    tags_str = json.dumps(tags).lower() if tags else ""
    combined = n + " " + tags_str

    if any(w in combined for w in ["oil change", "lube", "valvoline", "jiffy"]):
        services.add("oil_change")
    if "brake" in combined:
        services.add("brakes")
    if any(w in combined for w in ["tire", "tyre", "les schwab", "discount tire"]):
        services.add("tires")
    if any(w in combined for w in ["transmission", "aamco"]):
        services.add("transmission")
    if any(w in combined for w in ["body", "collision", "paint", "maaco"]):
        services.add("body_work")
    if any(w in combined for w in ["exhaust", "muffler", "meineke"]):
        services.add("exhaust")
    if "alignment" in combined:
        services.add("alignment")
    if "inspection" in combined:
        services.add("inspection")
    if "diesel" in combined:
        services.add("diesel")
    if not services:
        services.add("general_repair")
    return list(services)


def classify_shop_type(name, services):
    n = name.lower()
    svc = set(services)
    if svc == {"body_work"} or "collision" in n or "body shop" in n:
        return "body_shop"
    if svc <= {"tires", "alignment"} and ("tire" in n or "tyre" in n):
        return "tire_shop"
    if svc == {"oil_change"} or "lube" in n:
        return "quick_lube"
    if svc == {"transmission"} or "transmission" in n:
        return "transmission_shop"
    if "dealer" in n:
        return "dealership"
    return "general_repair"


def grid_key(lat, lng, precision=4):
    """Create a grid cell key for fast spatial dedup (~100m precision at decimals=4)."""
    return f"{round(lat, precision)}_{round(lng, precision)}"


def main():
    print("=== Loading OSM data ===")
    raw_file = os.path.join(OUTPUT_DIR, "osm-mechanics-raw.json")
    with open(raw_file) as f:
        raw = json.load(f)
    print(f"  Raw records: {len(raw)}")

    # Normalize and filter
    print("\n=== Normalizing and filtering ===")
    shops = []
    filtered = 0
    for r in raw:
        tags = r.get("raw_tags", {})
        addr = r.get("address", {})
        name = r["name"]

        # Skip parts stores
        if is_parts_store(name):
            filtered += 1
            continue
        # Skip if shop=car_parts and no repair indicators
        if tags.get("shop") == "car_parts":
            n = name.lower()
            if not any(w in n for w in ["repair", "service", "mechanic", "auto care"]):
                filtered += 1
                continue

        state_raw = addr.get("state", "")
        state = STATE_ABBREVS.get(state_raw.lower(), state_raw) if state_raw else ""

        street_parts = []
        if addr.get("housenumber"):
            street_parts.append(addr["housenumber"])
        if addr.get("street"):
            street_parts.append(addr["street"])

        services = classify_services(name, tags)

        shops.append({
            "name": name,
            "lat": r["lat"],
            "lng": r["lng"],
            "state": state,
            "city": addr.get("city", ""),
            "address": " ".join(street_parts),
            "zip": addr.get("postcode", ""),
            "phone": r.get("phone", ""),
            "email": r.get("email", ""),
            "website": r.get("website", ""),
            "hours": r.get("opening_hours", ""),
            "brand": detect_brand(name) or r.get("brand", ""),
            "services": services,
            "shopType": classify_shop_type(name, services),
            "source": "osm",
            "source_id": r.get("osm_id", ""),
        })

    print(f"  Filtered out: {filtered}")
    print(f"  After filtering: {len(shops)}")

    # Grid-based dedup (O(n) instead of O(n^2))
    print("\n=== Grid-based deduplication ===")
    grid = {}
    unique = []
    merged = 0
    for s in shops:
        key = grid_key(s["lat"], s["lng"])
        if key in grid:
            # Check name similarity with existing entry at this grid cell
            existing = grid[key]
            if s["name"].lower()[:20] == existing["name"].lower()[:20]:
                merged += 1
                continue
        grid[key] = s
        unique.append(s)

    print(f"  Duplicates merged: {merged}")
    print(f"  Unique shops: {len(unique)}")

    # Assign IDs
    for i, r in enumerate(unique):
        st = (r.get("state") or "us").lower()
        name_slug = re.sub(r"[^a-z0-9]+", "-", r["name"].lower()).strip("-")[:50]
        r["id"] = f"shop-{st}-{name_slug}-{i}"
        r["slug"] = name_slug

    # Save
    output_file = os.path.join(OUTPUT_DIR, "mechanics-compiled.json")
    with open(output_file, "w") as f:
        json.dump(unique, f)  # No indent to save space on 60K+ records
    print(f"\n  Saved to {output_file}")

    # === REPORT ===
    print("\n" + "=" * 60)
    print("MECHANIC DATA COMPILATION REPORT")
    print("=" * 60)

    print(f"\nRaw records: {len(raw)}")
    print(f"Filtered out (parts stores/non-repair): {filtered}")
    print(f"Duplicates merged: {merged}")
    print(f"Final unique shops: {len(unique)}")

    state_counts = {}
    for r in unique:
        st = r.get("state") or "Unknown"
        state_counts[st] = state_counts.get(st, 0) + 1
    print("\nTop 20 states:")
    for st, c in sorted(state_counts.items(), key=lambda x: -x[1])[:20]:
        print(f"  {st}: {c}")

    type_counts = {}
    for r in unique:
        type_counts[r["shopType"]] = type_counts.get(r["shopType"], 0) + 1
    print("\nBy shop type:")
    for t, c in sorted(type_counts.items(), key=lambda x: -x[1]):
        print(f"  {t}: {c}")

    brand_counts = {}
    for r in unique:
        if r.get("brand"):
            brand_counts[r["brand"]] = brand_counts.get(r["brand"], 0) + 1
    print("\nTop 15 chains:")
    for b, c in sorted(brand_counts.items(), key=lambda x: -x[1])[:15]:
        print(f"  {b}: {c}")
    independent = sum(1 for r in unique if not r.get("brand"))
    print(f"  Independent shops: {independent}")

    svc_counts = {}
    for r in unique:
        for s in r.get("services", []):
            svc_counts[s] = svc_counts.get(s, 0) + 1
    print("\nServices offered:")
    for s, c in sorted(svc_counts.items(), key=lambda x: -x[1]):
        print(f"  {s}: {c}")

    with_web = sum(1 for r in unique if r.get("website"))
    with_phone = sum(1 for r in unique if r.get("phone"))
    with_hours = sum(1 for r in unique if r.get("hours"))
    with_state = sum(1 for r in unique if r.get("state"))
    print(f"\nData richness:")
    print(f"  With website: {with_web} ({100*with_web//max(len(unique),1)}%)")
    print(f"  With phone: {with_phone} ({100*with_phone//max(len(unique),1)}%)")
    print(f"  With hours: {with_hours} ({100*with_hours//max(len(unique),1)}%)")
    print(f"  With state assigned: {with_state} ({100*with_state//max(len(unique),1)}%)")
    print(f"  Still need geocoding: {len(unique) - with_state}")


if __name__ == "__main__":
    main()
