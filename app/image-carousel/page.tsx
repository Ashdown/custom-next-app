import styles from "./page.module.css";
import Carousel from "@/app/image-carousel/_lib/carousel";

// TODO: Fix carousel styling
// TODO: break out into functions and unit test
// TODO: add in a slide animation
// TODO: fix broken odd images

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

  return (
    <div className={styles.container}>
      <h1>Image Carousel</h1>
      <Carousel data={IMAGES} slidesPerPage={3}/>
    </div>
  );
};

export default App;
