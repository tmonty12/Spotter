import React from "react";
import FormField from "../FormField";

class Picture extends React.Component {
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
        <button type="submit" className="ui primary button">
          {this.props.buttonText}
        </button>
        <button
          className="ui button cancel-btn"
          type="reset"
          onClick={() => this.props.history.goBack()}
        >
          Cancel
        </button>
      </form>
    );
  }
}

export default Picture;
