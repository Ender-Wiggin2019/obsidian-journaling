import React, { useEffect, useState } from "react";
import { IJournalingImage, ImageType } from "../types";
import { BasedImage } from "./BasedImage";
import { Badge } from "../ui/badge";
import BasedDesc from "./desc/BasedDesc";
import FrameDesc from "./desc/FrameDesc";
import ReviewDesc from "./desc/ReviewDesc";
import { Separator } from "../ui/separator";
import PhotoDesc from "./desc/PhotoDesc";

const JournalingImage: React.FC<IJournalingImage> = (props) => {
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (props.dimensions) {
      setWidth(props.dimensions.naturalWidth);
      setHeight(props.dimensions.naturalHeight);
    }
  }, [props.dimensions]);

  // console.log("notShow", notShow);
  if (props.imageType === ImageType.REVIEW) {
    return (
      <div className="w-full place-items-center">
        <div className="review-container">
          <div className="md:flex px-4 py-4 gap-4 leading-none max-w-4xl">
            <div className="flex-none">
              <BasedImage image={props.imageLink} imageType={props.imageType} />
            </div>
            <ReviewDesc {...props} />
          </div>
        </div>
      </div>
    );
  } else if (props.imageType === ImageType.ART) {
    return (
      <div className="art-picture-frame-container">
        <div className="flex flex-col lg:flex-row justify-start gap-4 mx-1 my-2">
          <BasedImage image={props.imageLink} imageType={props.imageType} />
          {/*<BasedDesc {...props} />*/}
          <FrameDesc {...props} />
        </div>
      </div>
    );
  } else if (props.imageType === ImageType.PHOTO) {
    return (
      <div className="photo-container justify-between">
        <div className="photo-picture gap-2">
          <BasedImage image={props.imageLink} imageType={props.imageType} />
          <div className="text-[color:var(--text-normal)] border-b pb-1 text-2xl font-semibold">
            {props.name}
          </div>
          <div className="flex flex-row gap-4">
            {props.tagList.map((tag, index) => (
              <Badge
                key={index}
                className="bg-[color:var(--tag-background)] text-[color:var(--tag-color)] text-md"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-x-4 text-sm mx-4">
          <Separator
            orientation="vertical"
            className="bg-[color:var(--text-faint)]"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-end">
            <div className="bg-clip-padding w-8 h-16 p-6 bg-[color:var(--tag-background)] border-4 border-[color:var(--tag-background)] border-dashed" />
          </div>
          {/*<BasedDesc {...props} />*/}
          <PhotoDesc {...props} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="default-container">
        {/*<div className='art-picture-frame'>*/}
        <div className="flex flex-col justify-start gap-4">
          <BasedImage image={props.imageLink} imageType={props.imageType} />
          {/*<BasedDesc {...props} />*/}
          <BasedDesc {...props} />
        </div>
      </div>
    );
  }
};

export default JournalingImage;
