import css from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={css.button}>
      Load More
    </button>
  );
};
export default LoadMoreBtn;
