import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, FieldArray } from "redux-form";
import ErrorMessage from "./ErrorMessage";
import "./CreateLog.css";

class CreateLog extends React.Component {
  setTitleDate() {
    const { date } = this.props;
    let day;
    let month;
    switch (date.getDay()) {
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
      default:
        day = "Sunday";
    }

    switch (date.getMonth()) {
      case 1:
        month = "Febrauary";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
      default:
        month = "Januaury";
    }
    return `${day}, ${month} ${date.getDate()}`;
  }

  renderError = ({ error, touched }) => {
    if (error && touched) {
      return <ErrorMessage text={error} />;
    }
  };

  renderInput = (formProps) => {
    const className = `ui field ${
      formProps.meta.touched && formProps.meta.error ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{formProps.label}</label>
        <input type={formProps.type} {...formProps.input} />
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  renderSets = ({ fields }) => {
    return (
      <>
        {fields.map((set, index) => (
          <div key={index} className="set-container">
            <h4>Set #{index + 1}</h4>
            <Field
              name={`${set}.weight`}
              type="number"
              component={this.renderInput}
              label={`Weight`}
            />
            <Field
              name={`${set}.reps`}
              type="number"
              component={this.renderInput}
              label={`Reps`}
            />
            <i className="minus icon" onClick={() => fields.remove(index)}></i>
          </div>
        ))}
        <div className="add-set-button" onClick={() => fields.push()}>
          <i className="plus icon"></i>
          Add Set
        </div>
      </>
    );
  };

  renderExercise = ({ fields }) => {
    return (
      <>
        {fields.map((exercise, index) => (
          <div key={index}>
            <h4>Exercise #{index + 1}</h4>
            <div className="exercise-container">
              <Field
                name={`${exercise}.name`}
                type="text"
                component={this.renderInput}
                label="Name"
              />
              {index === 0 ? null : (
                <i
                  className="times icon"
                  onClick={() => fields.remove(index)}
                />
              )}
            </div>
            <FieldArray name={`${exercise}.sets`} component={this.renderSets} />
          </div>
        ))}
        <div className="add-exercise-button" onClick={() => fields.push({})}>
          <i className="plus icon"></i>
          Add Exercise
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="ui centered card create-log-card">
        <div className="content">
          <div className="header create-log-title">
            Workout Log
            <p className="workoutlog-date">for {this.setTitleDate()}</p>
          </div>
        </div>
        <div className="content">
          <form className="ui form">
            <FieldArray name="exercise" component={this.renderExercise} />
            <div className="create-log-set"></div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    date: state.logger.date,
  };
};

const formWrapped = reduxForm({
  form: "createLog",
})(CreateLog);

export default connect(mapStateToProps)(formWrapped);
