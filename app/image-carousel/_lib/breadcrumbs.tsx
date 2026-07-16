import styles from "./breadcrumbs.module.css";
import HiddenText from "@/app/image-carousel/_lib/hiddenText";
import useIndexImages from "@/app/image-carousel/_utils/useIndexImages";

type Props = {
  data: string[];
  slidesPerPage: number;
  selectedImage: number;
  onSelectImage: (newImage: number) => void;
}

const Breadcrumbs = ({data, slidesPerPage, selectedImage, onSelectImage}: Props) => {

  const indexImages = useIndexImages(data, slidesPerPage);

  return (
    <ul className={styles.dotNavigation}>
      { indexImages.map((image, index) =>
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
