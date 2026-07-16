import styles from "./breadcrumbs.module.css";
import HiddenText from "@/app/image-carousel/_lib/hiddenText";

type Props = {
  data: string[];
  slidesPerPage: number;
  selectedImage: number;
  onSelectImage: (newImage: number) => void;
}

const Breadcrumbs = ({data, slidesPerPage, selectedImage, onSelectImage}: Props) => {
  return (
    <ul className={styles.dotNavigation}>
      {
        data.filter((_, index) => index % slidesPerPage === 0
      ).map((image, index) =>
        <li key={image} className={styles.dotButtonItem}>
          <button className={styles.dotButton} disabled={selectedImage === index * slidesPerPage}
                  onClick={() => onSelectImage(index)}>
            <HiddenText>image {index + 1}</HiddenText>
          </button>
        </li>
      )}
    </ul>
  )
}

export default Breadcrumbs;
