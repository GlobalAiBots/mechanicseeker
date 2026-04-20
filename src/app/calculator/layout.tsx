import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Maintenance Schedule Calculator | MechanicSeeker",
  description:
    "Enter your mileage to see which maintenance services are due. Get personalized oil change, brake, tire rotation, and transmission service schedules with cost estimates.",
  alternates: {
    canonical: "https://www.mechanicseeker.com/calculator",
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
