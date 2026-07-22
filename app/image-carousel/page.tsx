'use client';

import styles from "./page.module.css";
import Carousel from "@/app/image-carousel/_lib/carousel";
import {useEffect} from "react";

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

const App = () => {

  const doSomething = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 2000);
    });
  }

  const call = async () => {
    // const result = await doSomething();
    // console.log(result);

    doSomething().then((result) => console.log(result));

  }

  call();

  return (
    <div className={styles.page}>
      <h1>Image Carousel</h1>
      <Carousel data={IMAGES} slidesPerPage={3}/>
    </div>
  );
};

export default App;
