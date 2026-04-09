"""Try to pull licensed auto repair shops from state databases."""
import requests
import json
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADERS = {"User-Agent": "MechanicSeeker/1.0 (admin@globalaibots.com)"}


def try_california_bar():
    """California Bureau of Automotive Repair."""
    print("  Trying California BAR...")
    try:
        resp = requests.get(
            "https://www.bar.ca.gov/pubweblookup/",
            headers=HEADERS, timeout=15, allow_redirects=True,
        )
        print(f"    BAR website: HTTP {resp.status_code} (requires interactive search)")
        return []
    except Exception as e:
        print(f"    Error: {e}")
        return []


def try_new_york_dmv():
    """New York DMV repair shop registry."""
    print("  Trying New York DMV facility lookup...")
    try:
        resp = requests.get(
            "https://process.dmv.ny.gov/FacilityLookup/",
            headers=HEADERS, timeout=15,
        )
        print(f"    NY DMV: HTTP {resp.status_code} (requires interactive search)")
        return []
    except Exception as e:
        print(f"    Error: {e}")
        return []


def try_arcgis_search():
    """Search ArcGIS Hub for auto repair datasets."""
    print("  Searching ArcGIS Hub for auto repair data...")
    shops = []
    try:
        resp = requests.get(
            "https://hub.arcgis.com/api/v3/datasets",
            params={"q": "auto repair shop", "per_page": 10},
            headers=HEADERS, timeout=15,
        )
        if resp.status_code == 200:
            data = resp.json()
            results = data.get("data", [])
            print(f"    Found {len(results)} datasets on ArcGIS Hub")
            for ds in results[:5]:
                attrs = ds.get("attributes", {})
                print(f"    - {attrs.get('name', 'Untitled')}")
        else:
            print(f"    HTTP {resp.status_code}")
    except Exception as e:
        print(f"    Error: {e}")
    return shops


def main():
    all_shops = []

    print("=== State License Databases ===")
    ca = try_california_bar()
    all_shops.extend(ca)

    ny = try_new_york_dmv()
    all_shops.extend(ny)

    print("\n=== ArcGIS Hub ===")
    arc = try_arcgis_search()
    all_shops.extend(arc)

    output_file = os.path.join(OUTPUT_DIR, "state-licenses-raw.json")
    with open(output_file, "w") as f:
        json.dump(all_shops, f, indent=2)

    print(f"\nTotal from state/ArcGIS sources: {len(all_shops)}")
    print(f"Saved to {output_file}")
    print("\nNote: Most state license databases require interactive search or API keys.")
    print("OSM will be the primary data source for MechanicSeeker.")


if __name__ == "__main__":
    main()
