import type { Metadata } from "next";
import { NidsHero } from "./nids-hero";

export const metadata: Metadata = {
  title: "NIDS — Hybrid Intrusion Detection System | Abhishek Bobade",
  description:
    "A production-shaped hybrid signature + ML network intrusion detection system: packet capture, an Isolation-Forest anomaly model, and a PostgreSQL-backed alert API with a live dashboard.",
};

export default function NidsCaseStudy() {
  return <NidsHero />;
}
