import React from "react";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import FormField from "../FormField";

class PictureForm extends React.Component {
  renderFields() {
    const fields = [
      { name: "title", inputType: "input", label: "Title", type: "text" },
      {
        name: "content",
        inputType: "file",
        label: "Picture",
        accept: "image/*",
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
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.comment) {
    errors.comment = "You must enter a comment";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "picturePost",
  validate,
  enableReinitialize: true,
})(PictureForm);

export default withRouter(formWrapped);
