"""Compile all mechanic data, deduplicate, categorize, enrich."""
import json
import os
import math
import re
import time
import requests
from difflib import SequenceMatcher

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")

NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse"
NOMINATIM_HEADERS = {"User-Agent": "MechanicSeeker/1.0 (admin@globalaibots.com)"}

STATE_ABBREVS = {
    "alabama": "AL", "alaska": "AK", "arizona": "AZ", "arkansas": "AR",
    "california": "CA", "colorado": "CO", "connecticut": "CT", "delaware": "DE",
    "florida": "FL", "georgia": "GA", "hawaii": "HI", "idaho": "ID",
    "illinois": "IL", "indiana": "IN", "iowa": "IA", "kansas": "KS",
    "kentucky": "KY", "louisiana": "LA", "maine": "ME", "maryland": "MD",
    "massachusetts": "MA", "michigan": "MI", "minnesota": "MN", "mississippi": "MS",
    "missouri": "MO", "montana": "MT", "nebraska": "NE", "nevada": "NV",
    "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM", "new york": "NY",
    "north carolina": "NC", "north dakota": "ND", "ohio": "OH", "oklahoma": "OK",
    "oregon": "OR", "pennsylvania": "PA", "rhode island": "RI", "south carolina": "SC",
    "south dakota": "SD", "tennessee": "TN", "texas": "TX", "utah": "UT",
    "vermont": "VT", "virginia": "VA", "washington": "WA", "west virginia": "WV",
    "wisconsin": "WI", "wyoming": "WY",
}

PARTS_STORES = {"autozone", "o'reilly", "advance auto", "napa auto parts", "carquest"}
CHAINS = {
    "jiffy lube": "Jiffy Lube", "midas": "Midas", "meineke": "Meineke",
    "firestone": "Firestone", "pep boys": "Pep Boys", "aamco": "AAMCO",
    "maaco": "Maaco", "valvoline": "Valvoline", "take 5": "Take 5",
    "goodyear": "Goodyear", "ntb": "NTB", "christian brothers": "Christian Brothers",
    "caliber collision": "Caliber Collision", "service king": "Service King",
    "big o tires": "Big O Tires", "les schwab": "Les Schwab",
    "discount tire": "Discount Tire", "grease monkey": "Grease Monkey",
    "express oil": "Express Oil", "monro": "Monro",
}


def haversine_meters(lat1, lon1, lat2, lon2):
    R = 6371000
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def fuzzy_match(s1, s2):
    return SequenceMatcher(None, s1.lower().strip(), s2.lower().strip()).ratio()


def slugify(s):
    return re.sub(r"[^a-z0-9]+", s.lower(), "-").strip("-") if s else ""


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
            # Exception: "NAPA Auto Care" is a repair shop
            if "napa" in n and "care" in n:
                return False
            return True
    return False


def classify_services(name, tags):
    services = set()
    n = name.lower()
    tags_str = json.dumps(tags).lower()
    combined = n + " " + tags_str

    if "oil change" in combined or "lube" in combined or "valvoline" in n or "jiffy" in n:
        services.add("oil_change")
    if "brake" in combined:
        services.add("brakes")
    if "tire" in combined or "tyre" in combined or "les schwab" in n or "discount tire" in n:
        services.add("tires")
    if "transmission" in combined or "aamco" in n:
        services.add("transmission")
    if "body" in combined or "collision" in combined or "paint" in combined or "maaco" in n:
        services.add("body_work")
    if "exhaust" in combined or "muffler" in combined or "meineke" in n:
        services.add("exhaust")
    if "alignment" in combined:
        services.add("alignment")
    if "electric" in combined and "auto" in combined:
        services.add("electrical")
    if "ac " in combined or "air condition" in combined:
        services.add("ac")
    if "inspection" in combined:
        services.add("inspection")
    if "diesel" in combined:
        services.add("diesel")
    if "engine" in combined:
        services.add("engine_repair")
    if "suspension" in combined:
        services.add("suspension")

    # Add services from OSM tags
    for key in tags:
        if key.startswith("service:vehicle:") and tags[key] == "yes":
            svc = key.replace("service:vehicle:", "")
            services.add(svc)

    if not services:
        services.add("general_repair")

    return list(services)


def classify_shop_type(name, services):
    n = name.lower()
    svc = set(services)

    if svc == {"body_work"} or "collision" in n or "body shop" in n or "maaco" in n:
        return "body_shop"
    if svc <= {"tires", "alignment"} and ("tire" in n or "tyre" in n):
        return "tire_shop"
    if svc == {"oil_change"} or "lube" in n or "valvoline" in n or "jiffy" in n:
        return "quick_lube"
    if svc == {"transmission"} or "transmission" in n:
        return "transmission_shop"
    if "dealer" in n:
        return "dealership"
    return "general_repair"


def normalize_osm(raw):
    tags = raw.get("raw_tags", {})
    addr = raw.get("address", {})
    city = addr.get("city", "")
    state_raw = addr.get("state", "")
    state = STATE_ABBREVS.get(state_raw.lower(), state_raw) if state_raw else ""

    street_parts = []
    if addr.get("housenumber"):
        street_parts.append(addr["housenumber"])
    if addr.get("street"):
        street_parts.append(addr["street"])
    address_str = " ".join(street_parts)

    services = classify_services(raw["name"], tags)

    return {
        "name": raw["name"],
        "lat": raw["lat"],
        "lng": raw["lng"],
        "state": state,
        "city": city,
        "address": address_str,
        "zip": addr.get("postcode", ""),
        "phone": raw.get("phone", ""),
        "email": raw.get("email", ""),
        "website": raw.get("website", ""),
        "hours": raw.get("opening_hours", ""),
        "brand": detect_brand(raw["name"]) or raw.get("brand", ""),
        "services": services,
        "shopType": classify_shop_type(raw["name"], services),
        "source": "osm",
        "source_id": raw.get("osm_id", ""),
        "raw_tags": tags,
    }


def load_source(filename, source_name):
    filepath = os.path.join(OUTPUT_DIR, filename)
    if not os.path.exists(filepath):
        print(f"  {filename}: NOT FOUND (skipping)")
        return []
    with open(filepath) as f:
        data = json.load(f)
    print(f"  {filename}: {len(data)} records")
    return data


def deduplicate(records):
    unique = []
    merged = 0
    for rec in records:
        if not rec["name"] or rec["lat"] is None:
            continue
        found = False
        for ex in unique:
            dist = haversine_meters(rec["lat"], rec["lng"], ex["lat"], ex["lng"])
            if dist < 100 and fuzzy_match(rec["name"], ex["name"]) > 0.7:
                # Merge
                if not ex["website"] and rec["website"]:
                    ex["website"] = rec["website"]
                if not ex["phone"] and rec["phone"]:
                    ex["phone"] = rec["phone"]
                if len(rec["services"]) > len(ex["services"]):
                    ex["services"] = rec["services"]
                merged += 1
                found = True
                break
        if not found:
            unique.append(rec)
    return unique, merged


def reverse_geocode_batch(records, limit=200):
    need = [r for r in records if not r["state"]]
    print(f"\n  Reverse geocoding {len(need)} records (capped at {limit})...")
    done = 0
    for r in need[:limit]:
        try:
            resp = requests.get(
                NOMINATIM_URL,
                params={"lat": r["lat"], "lon": r["lng"], "format": "json", "zoom": 10},
                headers=NOMINATIM_HEADERS, timeout=10,
            )
            if resp.status_code == 200:
                data = resp.json()
                addr = data.get("address", {})
                st = addr.get("state", "")
                r["state"] = STATE_ABBREVS.get(st.lower(), st)
                if not r["city"]:
                    r["city"] = addr.get("city", addr.get("town", addr.get("village", addr.get("county", ""))))
                done += 1
        except Exception:
            pass
        time.sleep(1.1)
    print(f"  Geocoded {done} records")


def main():
    print("=== Loading raw data ===")

    osm_raw = load_source("osm-mechanics-raw.json", "osm")
    datagov_raw = load_source("datagov-mechanics-raw.json", "datagov")
    state_raw = load_source("state-licenses-raw.json", "state")

    # Normalize OSM data
    print(f"\n=== Normalizing {len(osm_raw)} OSM records ===")
    normalized = [normalize_osm(r) for r in osm_raw]

    total_raw = len(normalized)

    # Filter out parts stores
    print("\n=== Filtering ===")
    filtered_out = 0
    clean = []
    for r in normalized:
        if is_parts_store(r["name"]):
            filtered_out += 1
            continue
        if r.get("shopType") == "car_parts" or r.get("raw_tags", {}).get("shop") == "car_parts":
            # Keep if name suggests repair
            n = r["name"].lower()
            if "repair" not in n and "service" not in n and "mechanic" not in n:
                filtered_out += 1
                continue
        clean.append(r)

    print(f"  Filtered out: {filtered_out} (parts stores, non-repair)")
    print(f"  Remaining: {len(clean)}")

    # Deduplicate
    print("\n=== Deduplicating ===")
    unique, merged = deduplicate(clean)
    print(f"  Duplicates merged: {merged}")
    print(f"  Unique shops: {len(unique)}")

    # Geocode missing
    print("\n=== Enrichment ===")
    reverse_geocode_batch(unique, limit=200)

    # Assign IDs
    for i, r in enumerate(unique):
        st = r.get("state", "US").lower()
        name_slug = re.sub(r"[^a-z0-9]+", "-", r["name"].lower()).strip("-")
        r["id"] = f"shop-{st}-{name_slug}-{i}"
        r["slug"] = name_slug

    # Save
    output_file = os.path.join(OUTPUT_DIR, "mechanics-compiled.json")
    with open(output_file, "w") as f:
        json.dump(unique, f, indent=2)

    # === REPORT ===
    print("\n" + "=" * 60)
    print("MECHANIC DATA COMPILATION REPORT")
    print("=" * 60)

    print(f"\nRaw records: {total_raw}")
    print(f"Filtered out (parts stores): {filtered_out}")
    print(f"Duplicates merged: {merged}")
    print(f"Final unique shops: {len(unique)}")

    # By state
    state_counts = {}
    for r in unique:
        st = r.get("state", "Unknown") or "Unknown"
        state_counts[st] = state_counts.get(st, 0) + 1
    print("\nTop 20 states:")
    for st, c in sorted(state_counts.items(), key=lambda x: -x[1])[:20]:
        print(f"  {st}: {c}")

    # By shop type
    type_counts = {}
    for r in unique:
        t = r.get("shopType", "unknown")
        type_counts[t] = type_counts.get(t, 0) + 1
    print("\nBy shop type:")
    for t, c in sorted(type_counts.items(), key=lambda x: -x[1]):
        print(f"  {t}: {c}")

    # By brand
    brand_counts = {}
    for r in unique:
        b = r.get("brand", "")
        if b:
            brand_counts[b] = brand_counts.get(b, 0) + 1
    print("\nTop 15 chains:")
    for b, c in sorted(brand_counts.items(), key=lambda x: -x[1])[:15]:
        print(f"  {b}: {c}")
    independent = sum(1 for r in unique if not r.get("brand"))
    print(f"  Independent shops: {independent}")

    # By service
    svc_counts = {}
    for r in unique:
        for s in r.get("services", []):
            svc_counts[s] = svc_counts.get(s, 0) + 1
    print("\nServices offered:")
    for s, c in sorted(svc_counts.items(), key=lambda x: -x[1]):
        print(f"  {s}: {c}")

    # Data richness
    with_web = sum(1 for r in unique if r.get("website"))
    with_phone = sum(1 for r in unique if r.get("phone"))
    with_hours = sum(1 for r in unique if r.get("hours"))
    with_state = sum(1 for r in unique if r.get("state"))
    print(f"\nData richness:")
    print(f"  With website: {with_web} ({100*with_web//max(len(unique),1)}%)")
    print(f"  With phone: {with_phone} ({100*with_phone//max(len(unique),1)}%)")
    print(f"  With hours: {with_hours} ({100*with_hours//max(len(unique),1)}%)")
    print(f"  With state: {with_state} ({100*with_state//max(len(unique),1)}%)")

    print(f"\nSaved to {output_file}")


if __name__ == "__main__":
    main()
