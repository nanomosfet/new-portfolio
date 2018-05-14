import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import update from 'immutability-helper';
import HTML5Backend from 'react-dnd-html5-backend';
import SectionList from './section-list.js';
import QuestionList from './question-list.js';
{/* Displays all parts of the custom form creator */}
@DragDropContext(HTML5Backend)
class CustomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [
                {
                    id: 0,
                    name: "Appointment Setup",
                    questions: [
                        {
                            id: 0,
                            name: "Patient Name",
                            questionType: "text"
                        },
                        {
                            id: 1,
                            name: "Patient Age",
                            questionType: "number"
                        },
                        {
                            id: 4,
                            name: "Gender",
                            questionType: "dropdown",
                            options: [
                                {
                                    id: 0,
                                    option: 'Male'
                                },
                                {
                                    id:1,
                                    option: 'Female'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 1,
                    name: "Appointment Request",
                    questions: [
                        {
                            id: 2,
                            name: "Patient Name",
                            questionType: "text",
                        },
                        {
                            id: 3,
                            name: "Patient Age",
                            questionType: "number"
                        }
                    ]
                }
            ],
            editMode: 1,
            lastSectionId: 1,
            lastQuestionId: 4,
            lastOptionId: 3,
            currentSectionId: 0,
            currentQuestionId: 0
        }
        // These bindings are necessary to make `this` work in the callback
        this.handleAddSectionClick = this.handleAddSectionClick.bind(this);
        this.handleSectionNameChange = this.handleSectionNameChange.bind(this);
        this.handleRemoveSectionClick = this.handleRemoveSectionClick.bind(this);
        this.handleSectionItemClick = this.handleSectionItemClick.bind(this);
        this.handleAddQuestionClick = this.handleAddQuestionClick.bind(this);
        this.handleQuestionNameChange = this.handleQuestionNameChange.bind(this);
        this.handleQuestionTypeChange = this.handleQuestionTypeChange.bind(this);
        this.handleActiveQuestionClick = this.handleActiveQuestionClick.bind(this);
        this.handleQuestionRemoveClick = this.handleQuestionRemoveClick.bind(this);
        this.handleQuestionOptionChange = this.handleQuestionOptionChange.bind(this);
        this.handleQuestionAddOptionClick = this.handleQuestionAddOptionClick.bind(this);
        this.handleQuestionOptionRemoveClick = this.handleQuestionOptionRemoveClick.bind(this);

        this.moveQuestion = this.moveQuestion.bind(this);
    }

    // Drag Question Handlers

    moveQuestion(dragIndex,hoverIndex) {
        const questions = this.state.sections.find(section => section.id == this.state.currentSectionId).questions;
        const dragQuestion = questions[dragIndex];

        let newSection = update(this.state.sections.find(section => section.id == this.state.currentSectionId), {
            questions: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragQuestion]],
            },
        })

        let newSections = this.state.sections;
        let indexOfSection = newSections.indexOf(newSections.find(section => section.id == this.state.currentSectionId));
        newSections.splice(indexOfSection,1,newSection);


        this.setState({
            sections: newSections
        });
    }

    // Section Handlers

    // Updates state when a SectionItem is clicked
    handleSectionItemClick(currentSectionId) {
        let currentQuestionId = this.state.sections.find((section) => section.id == currentSectionId).questions[0].id;

        this.setState({
            currentSectionId: currentSectionId,
            currentQuestionId: currentQuestionId,
        });
    }

    // Updates state when a addSectionButton is clicked
    handleAddSectionClick() {
        let lastSectionId = this.state.lastSectionId + 1;
        let lastQuestionId = this.state.lastQuestionId + 1;
        let newSection = {
            id: lastSectionId,
            name: 'New Section',
            questions: [
                {
                    id: lastQuestionId,
                    name: "New Question",
                    questionType: "text"
                }
            ]
        }

        this.setState({
            sections: this.state.sections.concat(newSection),
            lastQuestionId: lastQuestionId,
            lastSectionId: lastSectionId,
            currentQuestionId: lastQuestionId,
            currentSectionId: lastSectionId
        });
    }
    // Updates state when a remove section is clicked.
    handleRemoveSectionClick(sectionId) {
        let lastSectionId = this.state.lastSectionId + 1;
        let lastQuestionId = this.state.lastQuestionId + 1;
        let newSections = this.state.sections;
        let indexToRemove = newSections.indexOf(newSections.find((section) => section.id === parseInt(sectionId)));

        newSections.splice(indexToRemove, 1);

        if(newSections.length == 0) {
            newSections = [{
                id: lastSectionId,
                name: 'New Section',
                questions: [
                    {
                        id: lastQuestionId,
                        name: "New Question",
                        questionType: "text"
                    }
                ]
            }]
        }
        this.setState({
            sections: newSections,
            currentSectionId: newSections[0].id,
            currentQuestionId: newSections[0].questions[0].id,
            lastQuestionId: lastQuestionId,
            lastSectionId: lastSectionId

        });
    }
    // Updates the state when the Section name changes.
    handleSectionNameChange(sectionId, newName) {
        let newSections = this.state.sections;
        newSections.find((section) => section.id === parseInt(sectionId)).name = newName;
        this.setState({
            sections: newSections
        });
    }


    //Question Handlers
    handleAddQuestionClick() {
        let lastQuestionId = this.state.lastQuestionId + 1;
        let newSections = this.state.sections;
        let newQuestion = {
            id: lastQuestionId,
            name: "New Question",
            questionType: "text"
        }
        newSections.find((section) => section.id == this.state.currentSectionId).questions.push(newQuestion);
        this.setState({
            lastQuestionId: lastQuestionId,
            sections: newSections
        });
    }

    handleQuestionNameChange(sectionId, questionId, newName) {

        let newSections = this.state.sections;
        newSections.find((section) => section.id === parseInt(sectionId))
            .questions.find((question) => question.id === parseInt(questionId)).name = newName;

        this.setState({
            sections: newSections
        });

    }

    handleQuestionTypeChange(sectionId, questionId, newType) {
        let newSections = this.state.sections;
        newSections.find((section) => section.id === parseInt(sectionId))
            .questions.find((question) => question.id === parseInt(questionId)).questionType = newType;

        if(newType == 'dropdown') {
            newSections.find((section) => section.id === parseInt(sectionId))
                .questions.find((question) => question.id === parseInt(questionId)).options = [];
        }
        this.setState({
            sections: newSections
        });
    }

    handleActiveQuestionClick(questionId) {
        this.setState({
            currentQuestionId: questionId
        });
    }

    handleQuestionRemoveClick(questionId) {
        let lastQuestionId = this.state.lastQuestionId;
        let currentQuestionId = questionId;
        let newSections = this.state.sections;

        let questionToRemove = newSections.find((section) => section.id == this.state.currentSectionId)
            .questions.find((question) => question.id == questionId);
        let indexToRemove = newSections.find((section) => section.id == this.state.currentSectionId)
            .questions.indexOf(questionToRemove);
        newSections.find((section) => section.id == this.state.currentSectionId).questions.splice(indexToRemove, 1);

        if(newSections.find((section) => section.id == this.state.currentSectionId).questions.length == 0) {
            lastQuestionId = lastQuestionId + 1;
            currentQuestionId = lastQuestionId;
            let newQuestion = {
                id: lastQuestionId,
                name: "New Question",
                questionType: "text"
            }
            newSections.find((section) => section.id == this.state.currentSectionId).questions.push(newQuestion);
        }

        this.setState({
            sections: newSections,
            lastQuestionId: lastQuestionId,
            currentQuestionId: currentQuestionId

        });

    }
    handleQuestionOptionChange(optionId, newOption) {
        let newSections = this.state.sections;

        newSections.find((section) => section.id == this.state.currentSectionId).questions
            .find((question) => question.id == this.state.currentQuestionId).options
                .find((option) => option.id == optionId).option = newOption;

        this.setState({
            sections: newSections
        });
    }

    handleQuestionAddOptionClick(questionId) {
        let lastOptionId = this.state.lastOptionId + 1;
        let newOption = {
            id: lastOptionId,
            option: 'New Option'
        }
        let newSections = this.state.sections;

        newSections.find((section) => section.id == this.state.currentSectionId).questions
            .find((question) => question.id == questionId).options.push(newOption);


        let focusCallback = () => {
            $('#option-'+lastOptionId).select();            
        }
        this.setState({
            sections: newSections,
            lastOptionId: lastOptionId
        },
        focusCallback);


    }
    handleQuestionOptionRemoveClick(optionId, questionId) {
        let newSections = this.state.sections;
        let optionToRemove = newSections.find((section) => section.id == this.state.currentSectionId).questions
                .find((question) => question.id == questionId).options
                        .find((option) => option.id == optionId)

        let indexToRemove = newSections.find((section) => section.id == this.state.currentSectionId).questions
                .find((question) => question.id == questionId).options
                        .indexOf(optionToRemove);
        newSections.find((section) => section.id == this.state.currentSectionId).questions
            .find((question) => question.id == questionId).options.splice(indexToRemove, 1);

        this.setState({
            sections: newSections
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 border border-right-0">
                        <SectionList
                            currentSectionId={this.state.currentSectionId}
                            sections={this.state.sections}
                            onSectionItemClick={this.handleSectionItemClick}
                            editMode={this.state.editMode}
                            onAddSectionClick={this.handleAddSectionClick}
                            onSectionNameChange={this.handleSectionNameChange}
                            onRemoveSectionClick={this.handleRemoveSectionClick}
                        />
                    </div>
                    <div className="col-9 border border-left-0">
                        <QuestionList
                            currentSectionId={this.state.currentSectionId}
                            currentQuestionId={this.state.currentQuestionId}
                            sections={this.state.sections}
                            editMode={this.state.editMode}
                            onQuestionNameChange={this.handleQuestionNameChange}
                            onQuestionTypeChange={this.handleQuestionTypeChange}
                            onActiveQuestionClick={this.handleActiveQuestionClick}
                            onAddQuestionClick={this.handleAddQuestionClick}
                            onQuestionRemoveClick={this.handleQuestionRemoveClick}
                            onQuestionOptionChange={this.handleQuestionOptionChange}
                            onQuestionAddOptionClick={this.handleQuestionAddOptionClick}
                            onQuestionOptionRemoveClick={this.handleQuestionOptionRemoveClick}
                            moveQuestion={this.moveQuestion}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default CustomForm;