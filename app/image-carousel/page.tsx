'use client';

import styles from "./page.module.css";
import { useState } from "react";

const IMAGES: string[] = [
  // 1
  "https://picsum.photos/id/0/200/300",
  "https://picsum.photos/id/10/300/200",
  "https://picsum.photos/id/20/200/300",
  // page 2
  "https://picsum.photos/id/30/300/200",
  "https://picsum.photos/id/40/200/300",
  "https://picsum.photos/id/50/300/200",
  // page 3
  "https://picsum.photos/id/60/200/300",
  "https://picsum.photos/id/70/300/200",
  "https://picsum.photos/id/80/200/300",
  // page 4
  "https://picsum.photos/id/90/300/200"
];

const SLIDES_PER_PAGE = 3;

const App = () => {

  const [selectedImage, setSelectedImage] = useState(0);

  const onNextImage = () => {
    if (selectedImage >= IMAGES.length - SLIDES_PER_PAGE) {
      // if (selectedImage == IMAGES.length - 1) {
      setSelectedImage(0);
    } else {
      setSelectedImage(selectedImage + SLIDES_PER_PAGE);
    }
  };

  const onPreviousImage = () => {
    if (selectedImage === 0) {

      const remainder = IMAGES.length % SLIDES_PER_PAGE;
      // 10 % 3 = 2
      setSelectedImage(IMAGES.length - remainder + 1)

      setSelectedImage(IMAGES.length - 1);
    } else {
      setSelectedImage(selectedImage - SLIDES_PER_PAGE);
    }
  };

  const onSelectImage = (newImage: number) => {
    setSelectedImage(newImage * SLIDES_PER_PAGE);
  };

  return (
    <div className="container">
      <h1>Image Carousel</h1>

      <ul>
        <li>
          <img className={styles.image} src={IMAGES[selectedImage]} alt={`image ${selectedImage}`} />
        </li>
        <li>
          <img className={styles.image} src={IMAGES[selectedImage + 1]} alt={`image ${selectedImage}`} />
        </li>
        <li>
          <img className={styles.image} src={IMAGES[selectedImage + 2]} alt={`image ${selectedImage}`} />
        </li>
      </ul>

      <ul>
        <li>
          <button onClick={onPreviousImage}>Previous</button>
          <button onClick={onNextImage}>Next</button>
        </li>
      </ul>
      <ul className={styles.dotNavigation}>
        {IMAGES.filter((_, index) => {
          return index % SLIDES_PER_PAGE === 0;
        }).map((image, index) =>
          <li key={image} className={styles.dotButtonItem}>
            <button className={styles.dotButton} disabled={selectedImage === index * SLIDES_PER_PAGE}
                    onClick={() => onSelectImage(index)}>
              <span className={styles.hiddenText}>Select image {index + 1}</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default App;
