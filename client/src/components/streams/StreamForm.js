import { Field, reduxForm } from "redux-form";
import { useCallback } from "react";

const StreamForm = ({ handleSubmit, onSubmit, stream }) => {
  const renderInput = useCallback(
    ({ input, label, meta: { touched, error } }) => {
      return (
        <div className={`field ${touched && error ? "error" : ""}`}>
          <label htmlFor={input.name}>{label}</label>
          <input {...input} autoComplete="off" />
          {touched && error && (
            <div className="ui error message">
              <div className="header">{error}</div>
            </div>
          )}
        </div>
      );
    },
    []
  );

  const onFormSubmit = (formValues) => {
    onSubmit(formValues);
  };

  return (
    <form className="ui form error" onSubmit={handleSubmit(onFormSubmit)}>
      <Field
        name="title"
        component={renderInput}
        label="Enter Title"
        value={stream ? stream.title : ""}
      />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
        value={stream ? stream.description : ""}
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title.";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description.";
  }
  return errors;
};

export default reduxForm({
  form: "StreamForm",
  validate,
})(StreamForm);
