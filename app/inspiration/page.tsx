import { Metadata } from "next";
import InspirationClient from "./InspirationClient";

export const metadata: Metadata = {
  title: "Style & Design Inspiration | NARVO Textile & Hardware",
  description: "Browse completed design projects featuring NARVO's luxury wood veneers, custom cabinet hardware, and modular interior fittings.",
};

export default function InspirationPage() {
  return <InspirationClient />;
}
