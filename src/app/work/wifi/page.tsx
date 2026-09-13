import type { Metadata } from "next";
import { WifiHero } from "./wifi-hero";

export const metadata: Metadata = {
  title: "WiFi Security Lab — 802.11 Deauthentication | Abhishek Bobade",
  description:
    "An educational 802.11 deauthentication toolkit for a controlled lab environment: a real attack tool paired with a real defensive detector, gated behind an explicit authorization allow-list.",
};

export default function WifiCaseStudy() {
  return <WifiHero />;
}
