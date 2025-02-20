import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import Map from "../Map/Map";

const MapSection = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto lg:max-w-7xl mb-6">
        <SectionHeading title="secondSection.title" content="secondSection.content" />
      </div>
      <Map />
    </section>
  );
};

export default React.memo(MapSection);
