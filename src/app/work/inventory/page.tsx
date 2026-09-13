import type { Metadata } from "next";
import { InventoryHero } from "./inventory-hero";

export const metadata: Metadata = {
  title: "OfficeStock — Inventory & Asset Management | Abhishek Bobade",
  description:
    "A standalone inventory and asset-management system: an immutable stock ledger, purchase orders, employee asset check-out, and role-based access.",
};

export default function InventoryCaseStudy() {
  return <InventoryHero />;
}
