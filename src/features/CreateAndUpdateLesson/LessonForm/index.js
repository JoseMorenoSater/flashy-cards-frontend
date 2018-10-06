/**
 *
 * LessonForm
 *
 */

import React, { Component } from "react";

import PropTypes from "prop-types";
import TextInput from "../../../components/common/TextInput";
import TextAreaInput from "../../../components/common/TextAreaInput";
import ConceptList from "../ConceptList";

class LessonForm extends Component {
  static propTypes = {
    addNewConcept: PropTypes.func.isRequired,
    concepts: PropTypes.array.isRequired,
    setCardText: PropTypes.func.isRequired,
    setCardImage: PropTypes.func.isRequired,
    lessonName: PropTypes.string.isRequired
  };

  state = {
    lessonName: this.props.lessonName,
    lessonDescription: this.props.lessonDescription
  };

  componentWillMount() {
    if (this.props.match.path.includes("edit")) {
      this.props.requestLessonToEdit(Number(this.props.match.params.lessonId));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lessonName !== this.props.lessonName) {
      this.setState({ lessonName: this.props.lessonName });
    }
  }

  handleInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    return (
      <form>
        <div className="form-group row">
          <div className="col-md-6">
            <h1>Lesson</h1>
          </div>
          <div className="col-md-6">
            <button
              className="btn create-lesson-button pull-right"
              onClick={event => {
                event.preventDefault();
                this.props.saveNewLesson(this.props.lesson);
                this.props.history.push("/dashboard");
              }}
            >
              Save lesson
            </button>
          </div>
        </div>
        <TextInput
          inputId="lessonName"
          onChange={this.handleInputChange}
          value={this.state.lessonName}
          label="Lesson name"
          onBlur={() => this.props.changeNewLessonName(this.state.lessonName)}
          inputClassName="form-control"
          divClassName="form-group"
        />
        <TextAreaInput
          inputId="lessonDescription"
          onChange={this.handleInputChange}
          divClassName="form-group"
          label="Lesson description"
          inputClassName="form-control"
          onBlur={text => this.props.changeNewLessonDescription(text)}
        />
        <ConceptList
          concepts={this.props.concepts}
          setCardText={this.props.setCardText}
          setCardImage={this.props.setCardImage}
        />
        <div className="form-group text-center">
          <button
            className="btn create-lesson-button center-block"
            onClick={event => {
              event.preventDefault();
              this.props.addNewConcept();
            }}
          >
            Add new concept
          </button>
        </div>
      </form>
    );
  }
}

export default LessonForm;
