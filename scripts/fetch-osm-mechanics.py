"""Fetch all US auto repair shops from OpenStreetMap via Overpass API."""
import requests
import json
import time
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

OVERPASS_URL = "https://overpass-api.de/api/interpreter"

regions = [
    ("Northeast", "40.5,-80,47.5,-66.9"),
    ("Southeast", "24.5,-91.7,40.5,-75"),
    ("Midwest_North", "42,-104.5,49,-80"),
    ("Midwest_South", "36,-104.5,42,-80"),
    ("Southwest", "25,-124.5,42,-104.5"),
    ("Northwest", "42,-124.5,49,-104.5"),
    ("Alaska", "51,-180,71.5,-129.9"),
    ("Hawaii", "18.5,-161,22.5,-154.5"),
    ("Gulf_Coast", "24.5,-97.5,31,-80"),
    ("Mid_Atlantic", "36,-80,40.5,-75"),
    ("New_England", "40.5,-73.7,47.5,-66.9"),
    ("Great_Plains", "36,-104.5,49,-95"),
    ("Mountain_West", "36,-117,49,-104.5"),
    ("Pacific", "32,-124.5,42,-117"),
    ("Deep_South", "30,-91.7,36,-80"),
    ("Florida", "24.5,-87.6,31,-80"),
    ("Texas_East", "25.8,-97.5,36.5,-94"),
    ("Texas_West", "25.8,-106.6,36.5,-97.5"),
]

QUERY_TEMPLATE = """[out:json][timeout:600];
(
  node["shop"="car_repair"]({bbox});
  way["shop"="car_repair"]({bbox});
  node["shop"="mechanic"]({bbox});
  way["shop"="mechanic"]({bbox});
  node["craft"="mechanic"]({bbox});
  way["craft"="mechanic"]({bbox});
  node["shop"="car_parts"]({bbox});
  way["shop"="car_parts"]({bbox});
  node["shop"="tyres"]({bbox});
  way["shop"="tyres"]({bbox});
  node["industrial"="auto_repair"]({bbox});
  way["industrial"="auto_repair"]({bbox});
  node["shop"="motorcycle_repair"]({bbox});
  way["shop"="motorcycle_repair"]({bbox});
  node["amenity"="vehicle_inspection"]({bbox});
  way["amenity"="vehicle_inspection"]({bbox});
);
out center tags;"""


def get_coords(el):
    if "lat" in el and "lon" in el:
        return el["lat"], el["lon"]
    if "center" in el:
        return el["center"]["lat"], el["center"]["lon"]
    return None, None


def detect_shop_type(tags):
    if tags.get("shop") == "car_repair":
        return "car_repair"
    if tags.get("shop") == "mechanic" or tags.get("craft") == "mechanic":
        return "mechanic"
    if tags.get("shop") == "tyres":
        return "tyres"
    if tags.get("shop") == "car_parts":
        return "car_parts"
    if tags.get("industrial") == "auto_repair":
        return "auto_repair"
    if tags.get("shop") == "motorcycle_repair":
        return "motorcycle_repair"
    if tags.get("amenity") == "vehicle_inspection":
        return "inspection"
    return "car_repair"


def query_region(name, bbox):
    query = QUERY_TEMPLATE.format(bbox=bbox)
    print(f"  Querying {name} ({bbox})...")
    for attempt in range(4):
        try:
            resp = requests.post(
                OVERPASS_URL,
                data={"data": query},
                headers={"User-Agent": "MechanicSeeker/1.0 (admin@globalaibots.com)"},
                timeout=180,
            )
            if resp.status_code == 429:
                wait = (attempt + 1) * 20
                print(f"    Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            if resp.status_code == 504:
                wait = (attempt + 1) * 30
                print(f"    Timeout, waiting {wait}s...")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            data = resp.json()
            return data.get("elements", [])
        except Exception as e:
            print(f"    Error attempt {attempt+1}: {e}")
            time.sleep(15)
    return []


def main():
    all_shops = []
    seen_ids = set()

    for name, bbox in regions:
        elements = query_region(name, bbox)
        count = 0
        for el in elements:
            osm_id = f"{el['type']}_{el['id']}"
            if osm_id in seen_ids:
                continue
            seen_ids.add(osm_id)

            tags = el.get("tags", {})
            shop_name = tags.get("name", "")
            if not shop_name:
                continue

            lat, lng = get_coords(el)
            if lat is None:
                continue

            # Extract services from tags
            services = []
            for key in tags:
                if key.startswith("service:vehicle:"):
                    svc = key.replace("service:vehicle:", "")
                    if tags[key] == "yes":
                        services.append(svc)

            shop = {
                "osm_id": osm_id,
                "osm_type": el["type"],
                "name": shop_name,
                "lat": lat,
                "lng": lng,
                "shop_type": detect_shop_type(tags),
                "website": tags.get("website", tags.get("contact:website", "")),
                "phone": tags.get("phone", tags.get("contact:phone", "")),
                "email": tags.get("email", tags.get("contact:email", "")),
                "brand": tags.get("brand", ""),
                "operator": tags.get("operator", ""),
                "opening_hours": tags.get("opening_hours", ""),
                "description": tags.get("description", ""),
                "services": services,
                "address": {
                    "housenumber": tags.get("addr:housenumber", ""),
                    "street": tags.get("addr:street", ""),
                    "city": tags.get("addr:city", ""),
                    "state": tags.get("addr:state", ""),
                    "postcode": tags.get("addr:postcode", ""),
                },
                "raw_tags": tags,
                "source": "osm",
                "region": name,
            }
            all_shops.append(shop)
            count += 1

        print(f"  {name}: {len(elements)} elements, {count} named shops")
        time.sleep(10)

    output_file = os.path.join(OUTPUT_DIR, "osm-mechanics-raw.json")
    with open(output_file, "w") as f:
        json.dump(all_shops, f, indent=2)

    print(f"\nTotal named auto shops from OSM: {len(all_shops)}")
    print(f"Saved to {output_file}")


if __name__ == "__main__":
    main()
