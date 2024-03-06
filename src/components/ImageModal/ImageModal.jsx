import css from "./ImageModal.module.css";

export const ImageModal = ({ content: { description, urls, user, links } }) => {
  const handleDownloadClick = () => {
    window.open(links.download, "_blank");
  };

  return (
    <>
      <img className={css.image} src={urls.regular} alt={description} />
      <div className={css.title}>
        <p>Author: {user.last_name}</p>
        <button type="button" onClick={handleDownloadClick}>
          download
        </button>
      </div>
    </>
  );
};
