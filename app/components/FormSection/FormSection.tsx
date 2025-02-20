import Form from "../Form/Form";
import SectionHeading from "../SectionHeading/SectionHeading";
import Table from "../Table/Table";

export default function FormSection() {
  return (
    <section className="py-10 overflow-hidden">
      <div className="container mx-auto px-4 lg:max-w-7xl">
        <SectionHeading
          title="firstSection.title"
          content="firstSection.content"
        />
        <div className="flex flex-col lg:flex-row gap-8 pt-10">
          <div className="w-full lg:w-1/2">
            <Form />
          </div>
          <div className="w-full lg:w-1/2  overflow-x-auto">
            <Table />
          </div>
        </div>
      </div>
    </section>
  );
}