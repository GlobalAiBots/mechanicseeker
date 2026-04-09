"""Search Data.gov for auto repair business datasets."""
import requests
import json
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADERS = {"User-Agent": "MechanicSeeker/1.0 (admin@globalaibots.com)"}


def search_data_gov():
    """Search data.gov for auto repair datasets."""
    shops = []
    queries = ["auto repair", "automotive repair", "vehicle repair", "mechanic shop"]

    for q in queries:
        print(f"  Searching data.gov: '{q}'...")
        try:
            resp = requests.get(
                "https://catalog.data.gov/api/3/action/package_search",
                params={"q": q, "rows": 10},
                headers=HEADERS,
                timeout=15,
            )
            if resp.status_code == 200:
                data = resp.json()
                results = data.get("result", {}).get("results", [])
                print(f"    Found {len(results)} datasets")
                for ds in results[:3]:
                    title = ds.get("title", "")
                    print(f"    - {title}")
                    for res in ds.get("resources", []):
                        fmt = res.get("format", "").lower()
                        if fmt in ("csv", "json", "geojson"):
                            print(f"      [{fmt}] {res.get('url', '')[:80]}")
        except Exception as e:
            print(f"    Error: {e}")

    return shops


def main():
    print("=== Data.gov Auto Repair Search ===")
    shops = search_data_gov()

    output_file = os.path.join(OUTPUT_DIR, "datagov-mechanics-raw.json")
    with open(output_file, "w") as f:
        json.dump(shops, f, indent=2)

    print(f"\nTotal from Data.gov: {len(shops)}")
    print(f"Saved to {output_file}")


if __name__ == "__main__":
    main()
