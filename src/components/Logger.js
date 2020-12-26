import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectDate } from "../actions/logger";
import "./Logger.css";

class Logger extends React.Component {
  selectDate = (date) => {
    this.props.selectDate(date);
  };

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

  render() {
    return (
      <div className="logger ui grid">
        <div className="row">
          <div className="eight wide column">
            <Calendar
              value={this.props.date}
              onChange={this.selectDate}
              next2Label={null}
              prev2Label={null}
            />
          </div>
          <div className="eight wide column">
            <div className="ui centered card workout-log-card">
              <div className="content">
                <div className="header">
                  Workout Log
                  <p className="workoutlog-date">for {this.setTitleDate()}</p>
                </div>
                <Link to="/blueprint/logger/create">
                  <button className="ui primary button create-workoutlog-btn">
                    Create
                  </button>
                </Link>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, { selectDate })(Logger);
