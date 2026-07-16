'use client';

import {useState} from "react";
import styles from "./carousel.module.css";
import Breadcrumbs from "@/app/image-carousel/_lib/breadcrumbs";

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
      setSelectedImage(data.length - remainder + 1)

      setSelectedImage(data.length - 1);
    } else {
      setSelectedImage(selectedImage - slidesPerPage);
    }
  };

  const onSelectImage = (newImage: number) => {
    setSelectedImage(newImage * slidesPerPage);
  };

  return <>
    <ul>
      <li>
        <img className={styles.image} src={data[selectedImage]} alt={`image ${selectedImage}`} />
      </li>
      <li>
        <img className={styles.image} src={data[selectedImage + 1]} alt={`image ${selectedImage}`} />
      </li>
      <li>
        <img className={styles.image} src={data[selectedImage + 2]} alt={`image ${selectedImage}`} />
      </li>
    </ul>

    <ul>
      <li>
        <button onClick={onPreviousImage}>Previous</button>
        <button onClick={onNextImage}>Next</button>
      </li>
    </ul>
    <Breadcrumbs data={data} slidesPerPage={slidesPerPage} selectedImage={selectedImage} onSelectImage={onSelectImage} />
  </>
}

export default Carousel;

