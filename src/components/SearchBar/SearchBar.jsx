import { Field, Form, Formik, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

import css from "./SearchBar.module.css";

export const SearchBar = ({ onSubmit }) => {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          onSubmit(values.query);
          if (!values.query) {
            toast.error("Please enter a search query");
          }
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <div className={css.inputBox}>
            <Field
              className={css.input}
              name="query"
              type="text"
              autoFocus
              placeholder="Search images and photos"
            />
            <FaSearch className={css.icon} />
          </div>
          <ErrorMessage
            name="query"
            component="span"
            style={{ color: "red" }}
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};
