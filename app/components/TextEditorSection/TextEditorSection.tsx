import EditorContent from "../EditorContent/EditorContent";
import SectionHeading from "../SectionHeading/SectionHeading";

export default function TextEditorSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto lg:max-w-7xl">
        <SectionHeading title="lastSection.title" content="lastSection.content" />
        <EditorContent />
      </div>
    </section>
  );
}
