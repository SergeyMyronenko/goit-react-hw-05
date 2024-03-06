import { ImageCard } from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ gallery, onOpen }) => {
  return (
    <ul className={css.gallery}>
      {gallery.map((item) => (
        <li key={item.id} className={css.galleryItem}>
          <ImageCard imageCard={item} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  );
};
