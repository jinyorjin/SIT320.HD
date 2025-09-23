import React, { useState } from "react";
import Slide from "./Slide";
import slidesData from "./SlidesData";
import "./App.css";

const SlidesDeck = () => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => setIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setIndex((prev) => Math.min(prev + 1, slidesData.length - 1));

  // content 가공: Observation 강조
  const formatContent = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("Observation")) {
        return (
          <div key={i} className="observation">
            {line}
          </div>
        );
      }
      return <p key={i}>{line}</p>;
    });
  };

  return (
    <div className="deck">
      <Slide
        slide={{
          ...slidesData[index],
          content: formatContent(slidesData[index].content),
        }}
        index={index}
        total={slidesData.length}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default SlidesDeck;
