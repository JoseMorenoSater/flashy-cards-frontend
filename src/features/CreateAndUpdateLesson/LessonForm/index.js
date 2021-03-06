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
    name: PropTypes.string.isRequired
  };

  state = {
    editMode: false,
    lessonName: this.props.name,
    lessonDescription: this.props.description
  };

  componentWillMount() {
    if (this.props.match.path.includes("edit")) {
      this.setState({ editMode: true });
      this.props.requestLessonToEdit(Number(this.props.match.params.lessonId));
    } else {
      this.props.newLesson();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.setState({ lessonName: this.props.name });
    }
    if (prevProps.description !== this.props.description) {
      this.setState({ lessonDescription: this.props.description });
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
                if (this.state.editMode !== true) {
                  this.props.saveNewLesson(this.props.lesson);
                } else {
                  this.props.requestUpdateLesson();
                }
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
          value={this.state.lessonDescription}
          divClassName="form-group"
          label="Lesson description"
          inputClassName="form-control"
          onBlur={() => {
            this.props.changeNewLessonDescription(this.state.lessonDescription);
          }}
        />
        <ConceptList
          concepts={this.props.concepts}
          deleteConcept={this.props.deleteConcept}
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
