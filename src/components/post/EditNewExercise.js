import React from "react";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import FormField from "../FormField";

class EditNewExercise extends React.Component {
  renderFields() {
    const options = [
      { value: "", text: "Use CTRL to select the targeted muscles..." },
      { value: "traps", text: "Traps" },
      { value: "shoulders", text: "Shoulders" },
      { value: "lats", text: "Lats" },
      { value: "chest", text: "Chest" },
      { value: "biceps", text: "Biceps" },
      { value: "triceps", text: "Triceps" },
      { value: "abs", text: "Abs" },
      { value: "glutes", text: "Glutes" },
      { value: "quads", text: "Quads" },
      { value: "hamstring", text: "Hamstrings" },
      { value: "calves", text: "Calves" },
    ];

    const fields = [
      { name: "exercise", inputType: "input", label: "Exercise", type: "text" },
      {
        name: "targetedMuscles",
        inputType: "multipleSelect",
        options,
        label: "Targeted Muscles",
      },
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
  if (!formValues.targetedMuscles) {
    errors.targetedMuscles = "You must select the targeted muscles";
  }
  if (!formValues.comment) {
    errors.comment = "You must enter a comment";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "newExercisePost",
  validate,
})(EditNewExercise);

export default withRouter(formWrapped);
