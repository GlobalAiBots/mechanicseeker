import Link from "next/link";
import type { Metadata } from "next";
import GearRecommendation from "@/components/GearRecommendation";

export const metadata: Metadata = {
  title: "Car Won't Start? Here's What to Check Before Calling a Mechanic | MechanicSeeker",
  description:
    "A step-by-step diagnostic checklist for when your car won't start. Battery, starter, alternator, fuel pump, ignition switch — how to narrow down the problem yourself.",
  alternates: {
    canonical: "https://www.mechanicseeker.com/blog/car-wont-start",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Car Won't Start? Here's What to Check Before Calling a Mechanic",
  datePublished: "2026-04-19",
  author: { "@type": "Organization", name: "MechanicSeeker" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mechanicseeker.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.mechanicseeker.com/blog" },
    { "@type": "ListItem", position: 3, name: "Car Won't Start", item: "https://www.mechanicseeker.com/blog/car-wont-start" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I tell if it's the battery or the starter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Try the headlights. If they are bright and the dome light is normal but the car only clicks or does nothing when you turn the key, the battery has voltage but cannot deliver current — often a starter or a corroded battery cable. If the headlights are dim or dead, start with the battery.",
      },
    },
    {
      "@type": "Question",
      name: "Can a bad alternator stop a car from starting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. An alternator charges the battery while the engine runs. If it has failed, the battery slowly drains until there is not enough voltage to turn the starter. The telltale sign is a pattern of jump-starting, driving fine, then needing another jump within a day or two.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to diagnose a no-start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most shops charge $80 to $150 for a no-start diagnosis. Auto parts stores test batteries and alternators for free, which can save you a diagnostic fee if the cause is electrical. Towing to a shop typically adds $75 to $150 depending on distance.",
      },
    },
  ],
};

export default function CarWontStart() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link>{" "}
        &raquo;{" "}
        <Link href="/blog" className="hover:underline">Blog</Link>{" "}
        &raquo;{" "}
        <span className="text-gray-700">Car Won&apos;t Start</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[Cabin]">
        Car Won&apos;t Start? Here&apos;s What to Check Before Calling a Mechanic
      </h1>
      <p className="text-sm text-gray-500 mb-8">Published April 19, 2026</p>

      <div className="prose prose-gray max-w-none text-[#1A1A1A] leading-relaxed space-y-6">
        <p>
          A car that won&apos;t start is stressful, but the fix is usually
          cheaper than you fear. The noise your car makes (or doesn&apos;t
          make) when you turn the key is a diagnostic in itself. Work
          through this checklist before you spend $150 on a tow.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Step 1: Listen to What It Does
        </h2>
        <p>
          Turn the key (or press start) and pay attention. Three patterns
          tell three different stories:
        </p>
        <p>
          <strong>Nothing at all — no click, no crank, no dash lights.</strong>{" "}
          Start with the battery or ignition switch. The electrical system
          is not getting power.
        </p>
        <p>
          <strong>A single click, or rapid clicking, but no crank.</strong>{" "}
          The battery has some charge but not enough to spin the starter,
          or the starter itself has failed. Cable corrosion is a common
          culprit.
        </p>
        <p>
          <strong>It cranks (engine spins) but will not fire.</strong> The
          electrical system is fine. You have a fuel, spark, or security-
          system problem.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Dead Battery
        </h2>
        <p>
          The number-one cause of no-starts. Symptoms: dim or dead dash
          lights, weak or no cranking, clicking. Left a dome light on
          overnight? Cold snap? That is your answer.
        </p>
        <p>
          <strong>Test it:</strong> With a{" "}
          <a
            href="https://www.amazon.com/s?k=automotive+multimeter&tag=babymydog03-20"
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="text-[#E67E22] hover:underline font-semibold"
          >
            digital multimeter
          </a>
          , a healthy resting battery reads 12.4 to 12.7 volts. Below 12.0 is
          discharged; below 11.5 is unlikely to crank. A dedicated{" "}
          <a
            href="https://www.amazon.com/s?k=12v+car+battery+load+tester&tag=babymydog03-20"
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="text-[#E67E22] hover:underline font-semibold"
          >
            12V battery load tester
          </a>{" "}
          gives a more complete picture by measuring voltage under load.
        </p>
        <p>
          <strong>Fix it:</strong> Jump-start with cables from a second car
          or a{" "}
          <a
            href="https://www.amazon.com/s?k=portable+car+jump+starter&tag=babymydog03-20"
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="text-[#E67E22] hover:underline font-semibold"
          >
            portable jump starter
          </a>
          . If it starts and stays running, drive for 20-30 minutes to let
          the alternator recharge. If the battery keeps dying, jump to the
          alternator section.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Bad Alternator
        </h2>
        <p>
          The alternator keeps the battery topped up while the engine runs.
          When it fails, you get into a cycle of jump-starting, driving
          fine, then dying again within a day or two. Other clues: the
          battery warning light on the dash, dimming headlights at idle, or
          a whining noise from the engine bay.
        </p>
        <p>
          <strong>Test it:</strong> With the engine running, a multimeter
          across the battery terminals should read 13.8 to 14.7 volts. If
          it reads below 13.0, the alternator is not charging. Auto parts
          stores will test your charging system for free.
        </p>
        <p>
          <strong>Fix it:</strong> Replacement is moderate DIY on most
          vehicles. See our{" "}
          <Link href="/costs/alternator" className="text-[#E67E22] hover:underline font-semibold">
            alternator replacement cost guide
          </Link>{" "}
          for price ranges by vehicle type.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Starter Motor
        </h2>
        <p>
          A single loud click when you turn the key and nothing else — with
          a battery that tests good — points to the starter solenoid or
          motor. Sometimes a failing starter will work after a gentle tap
          with a wrench on the starter housing. That trick has bought many
          drivers a ride home, but it is a short-term fix.
        </p>
        <p>
          <strong>Fix it:</strong> Starter replacement ranges from $250 to
          $800 at a shop depending on access. DIY is possible on trucks and
          older cars; on modern transverse engines, reaching the starter
          can mean removing intake components.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Fuel Pump
        </h2>
        <p>
          The engine cranks normally but refuses to fire — a classic fuel
          pump failure. Key test: turn the ignition to ON (without
          cranking) and listen near the rear of the car. A healthy fuel
          pump hums for 2-3 seconds to prime the system. Silence means the
          pump, the pump relay, or the fuel pump fuse has failed.
        </p>
        <p>
          <strong>Fix it:</strong> Check the fuel pump fuse and relay first
          — they are a five-minute, no-cost test. A failed pump itself
          usually means a shop visit; most pumps live inside the fuel tank
          and require either dropping the tank or accessing it through the
          rear seat.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Ignition Switch
        </h2>
        <p>
          No dash lights, no accessory power, no click — and the battery
          tests good? The ignition switch itself may be failing. Try
          wiggling the key or turning the wheel side to side while
          attempting to start (the steering lock can interfere). If the
          dash flickers on and off as you move the key, the switch is on
          its way out.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Security System or Key Fob
        </h2>
        <p>
          Modern cars will refuse to start if the key fob battery is dead
          or the immobilizer does not recognize the key. Signs: a
          security light on the dash that flashes or stays lit, or a
          message like &quot;Key Not Detected.&quot; Hold the fob against
          the start button (many cars have a backup antenna there) and
          try again. Replace the fob battery — a $3 CR2032 fixes this
          more often than drivers expect.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          Transmission Safety Interlock
        </h2>
        <p>
          Automatics will not crank unless the shifter is fully in Park or
          Neutral. Manuals require the clutch pedal fully depressed.
          Worn shift linkages or failing neutral safety switches can
          block starting even when the shifter looks correct. Jiggle the
          shifter; try starting in Neutral. If that works, the interlock
          switch needs service.
        </p>

        <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4 font-[Cabin]">
          When to Call a Tow Truck
        </h2>
        <p>
          Call for a tow when you have ruled out the battery and the car
          still will not start, when the fuel pump is silent with the key
          on, when the ignition switch shows no dash lights at all, or
          when a transmission interlock issue leaves you stuck. Pushing
          through a no-start by cranking repeatedly can flood the engine,
          overheat the starter, or drain a marginal battery past the
          point of jumping.
        </p>
        <p>
          If the battery is the culprit, a battery shop or mobile install
          service can have you running again in under an hour. See our{" "}
          <Link href="/services/battery-replacement" className="text-[#E67E22] hover:underline font-semibold">
            battery replacement service directory
          </Link>{" "}
          for local options. If you&apos;ve been hearing other odd sounds
          in the lead-up to the no-start, our guide to{" "}
          <Link href="/blog/car-strange-noises" className="text-[#E67E22] hover:underline font-semibold">
            strange car noises
          </Link>{" "}
          may help connect the dots.
        </p>

        <GearRecommendation section="emergency" />
      </div>
    </main>
  );
}
