import React from "react";
import { Field } from "redux-form";
import ErrorMessage from "./ErrorMessage";

class FormField extends React.Component {
  state = { imgPreviewURL: '' }
  determineComponent(inputType) {
    switch (inputType) {
      case "input":
        return this.renderInput;
      case "file":
        return this.renderFileInput;
      case "textArea":
        return this.renderTextArea;
      case "multipleSelect":
        return this.renderMultipleSelect;
      default:
        return this.renderInput;
    }
  }

  renderError = ({ error, touched }) => {
    if (error && touched) {
      return <ErrorMessage text={error} />;
    }
  };

  renderInput = (formProps) => {
    const className = `form-control ${
      formProps.meta.touched && formProps.meta.error ? "is-invalid" : ""
    }`;
    return (
      <div className="form-group">
        <label htmlFor={formProps.label}>{formProps.label}</label>
        <input
          className={className}
          id={formProps.label}
          type={formProps.type}
          {...formProps.input}
        />
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  renderFileInput = (formProps) => {
    const className = `form-control ${
      formProps.meta.touched && formProps.meta.error ? "is-invalid" : ""
    }`;
    return (
      <div className="form-group">
        <label>{formProps.label}</label>
          <input
            type="file"
            {...formProps.input}
            value={undefined}
            accept={formProps.accept}
            className={className}
            style={{height: '100%'}}
            id="customFile"
          />
      {this.renderError(formProps.meta)}
    </div>
    );
  };

  renderTextArea = (formProps) => {
    const className = `form-control ${
      formProps.meta.touched && formProps.meta.error ? "is-invalid" : ""
    }`;
    return (
      <div className="form-group">
        <label>{formProps.label}</label>
        <textarea {...formProps.input} className={className} />
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  onMultipleSelect = (e)=> {
    e.preventDefault()

    if (e.target.hasAttribute('selected')) e.target.removeAttribute('selected');
    else e.target.setAttribute('selected', '');
  }

  renderMultipleSelect = (formProps) => {
    return (
      <div className="form-group">
        <label>{formProps.label}</label>
        {formProps.options.map((option, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-label"
              type="checkbox"
              id={option.value}
              value={option.value}
              checked={formProps.input.value.indexOf(option.value) !== -1}
              onChange={ e => {
                const newValue = [...formProps.input.value]
                if(e.target.checked){
                  newValue.push(option.value)
                } else {
                  newValue.splice(newValue.indexOf(option.name), 1)
                }

                return formProps.input.onChange(newValue)
              }}
            />
            <label className="form-check-label" htmlFor={option.value} style={{marginLeft: '5px'}}>{option.text}</label>
          </div> 
        ))}
      </div>
    );
  };

  render() {
    return (
      <Field
        name={this.props.name}
        component={this.determineComponent(this.props.inputType)}
        label={this.props.label}
        type={this.props.inputType === "input" ? this.props.type : null}
        options={
          this.props.inputType === "multipleSelect" ? this.props.options : null
        }
        accept={this.props.inputType === "file" ? this.props.accept : null}
      />
    );
  }
}

export default FormField;
