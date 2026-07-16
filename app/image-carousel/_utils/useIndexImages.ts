import {useMemo} from "react";

const useIndexImages = (images: string[], imagesPerSlide: number) =>
  useMemo(() => images.filter((_, index) => index % imagesPerSlide === 0), [images, imagesPerSlide]);

export default useIndexImages;
