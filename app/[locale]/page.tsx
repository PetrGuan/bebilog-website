import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import SmartLogViz from "@/features/SmartLogViz";
import TrackingGrid from "@/features/TrackingGrid";
import InsightsViz from "@/features/InsightsViz";
import PredictionTimeline from "@/features/PredictionTimeline";
import GrowthChart from "@/features/GrowthChart";
import VaccineSchedule from "@/features/VaccineSchedule";
import BabyFoodHub from "@/features/BabyFoodHub";
import FeatureGrid from "@/components/FeatureGrid";
import Pricing from "@/components/Pricing";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";
import { FEATURES } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

const FEATURE_VISUALS: Record<string, React.ComponentType> = {
  smartLog: SmartLogViz,
  tracking: TrackingGrid,
  insights: InsightsViz,
  predictions: PredictionTimeline,
  growth: GrowthChart,
  vaccine: VaccineSchedule,
  food: BabyFoodHub,
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Nav />
      <Hero />
      {FEATURES.map((feature) => {
        const Visual = FEATURE_VISUALS[feature.key];
        return (
          <FeatureSection key={feature.key} feature={feature}>
            <Visual />
          </FeatureSection>
        );
      })}
      <FeatureGrid />
      <Pricing />
      <FooterCTA />
      <Footer />
    </main>
  );
}
