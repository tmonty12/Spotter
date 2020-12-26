import React from "react";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import FormField from "../FormField";

class CreatePersonalRecord extends React.Component {
  renderFields() {
    const fields = [
      { name: "exercise", inputType: "input", label: "Exercise", type: "text" },
      { name: "weight", inputType: "input", label: "Weight", type: "number" },
      { name: "reps", inputType: "input", label: "Reps", type: "number" },
      {
        name: "content",
        inputType: "file",
        label: "Video",
        accept: "video/*",
      },
      { name: "comment", inputType: "textArea", label: "Comment" },
    ];
    return fields.map((field) => <FormField {...field} key={field.name} />);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        className="ui form error"
      >
        {this.renderFields()}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            {this.props.buttonText}
          </button>
          <button
            className="btn btn-danger"
            type="reset"
            onClick={() => this.props.history.goBack()}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.exercise) {
    errors.exercise = "You must enter an exercise";
  }
  if (!formValues.weight) {
    errors.weight = "You must enter a valid weight";
  }
  if (!formValues.reps) {
    errors.reps = "You must enter the amount of reps";
  }
  if (!formValues.content) {
    errors.content = "You must upload a video";
  }
  if (!formValues.comment) {
    errors.comment = "You must enter a comment";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "personalRecordPost",
  validate,
})(CreatePersonalRecord);

export default withRouter(formWrapped);
