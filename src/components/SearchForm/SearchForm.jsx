import { Field, Form, Formik } from "formik";
import css from "./SearchForm.module.css";
import toast from "react-hot-toast";

const SearchForm = ({ request }) => {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        request(values.query);
        if (!values.query) {
          toast.error("Please enter a search query");
          return;
        }
        actions.resetForm();
      }}
    >
      <Form>
        <Field className={css.input} type="text" name="query"></Field>

        <button className={css.button} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
};
export default SearchForm;
