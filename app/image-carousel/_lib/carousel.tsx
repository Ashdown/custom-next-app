'use client';

import {useState} from "react";
import styles from "./carousel.module.css";
import Breadcrumbs from "@/app/image-carousel/_lib/breadcrumbs";
import HiddenText from "@/app/image-carousel/_lib/hiddenText";

type Props = {
  data: string[];
  slidesPerPage?: number;
}

const Carousel = ({data, slidesPerPage = 1}: Props) => {

  const [selectedImage, setSelectedImage] = useState(0);

  const onNextImage = () => {
    if (selectedImage >= data.length - slidesPerPage) {
      // if (selectedImage == data.length - 1) {
      setSelectedImage(0);
    } else {
      setSelectedImage(selectedImage + slidesPerPage);
    }
  };

  const onPreviousImage = () => {
    if (selectedImage === 0) {

      const remainder = data.length % slidesPerPage;
      // 10 % 3 = 2
      // setSelectedImage(data.length - remainder + 1)

      setSelectedImage(data.length - 1);
    } else {
      setSelectedImage(selectedImage - slidesPerPage);
    }
  };

  const onSelectImage = (newImage: number) => {
    setSelectedImage(newImage * slidesPerPage);
  };

  return <>
    <div className={styles.slideShow}>
      <ul className={styles.slides} style={
        {
          width: `calc(100% * ${data.length} / ${slidesPerPage})`,
          left: `calc(-100% / ${slidesPerPage} * ${selectedImage}`
        }
      }>
        { data.map((src, index) =>
          <li key={src} className={styles.slide} style={{width: `calc(100% / ${data.length})`}}>
            <img className={styles.image} src={src} alt={`image ${index + 1}`} />
          </li>
        )}
      </ul>
      <ul>
        <li>
          <button className={`${styles.navigationButton} ${styles.previous}`} onClick={onPreviousImage}>
            <HiddenText>Previous</HiddenText>
          </button>
          <button className={`${styles.navigationButton} ${styles.next}`} onClick={onNextImage}>
            <HiddenText>Next</HiddenText>
          </button>
        </li>
      </ul>
    </div>
    <Breadcrumbs data={data} slidesPerPage={slidesPerPage} selectedImage={selectedImage} onSelectImage={onSelectImage} />
  </>
}

export default Carousel;

