import { Metadata } from "next";
import FormSection from "../components/FormSection/FormSection";
import MapSection from "../components/MapSection/MapSection";
import TextEditorSection from "../components/TextEditorSection/TextEditorSection";

export const metadata: Metadata = {
  title: `DigiFly Task`,

  description: "DigiFly Task - By Mohamed Fahim (Front End Developer)",
};
export default function page() {
  return (
    <>
      <FormSection />
      <MapSection />
      <TextEditorSection />
    </>
  );
}
