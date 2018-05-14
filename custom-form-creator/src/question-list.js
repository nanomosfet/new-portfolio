import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './question-item.scss';
import AddQuestionItem from './add-question-item.js';

import QuestionItem from './question-item.js';


class QuestionList extends Component {
    constructor(props) {
        super(props);
        this.handleQuestionNameChange = this.handleQuestionNameChange.bind(this);
        this.handleQuestionTypeChange = this.handleQuestionTypeChange.bind(this);
        this.handleActiveQuestionClick = this.handleActiveQuestionClick.bind(this);
        this.handleAddQuestionClick = this.handleAddQuestionClick.bind(this);
        this.handleQuestionRemoveClick = this.handleQuestionRemoveClick.bind(this);
        this.handleQuestionOptionChange = this.handleQuestionOptionChange.bind(this);
        this.handleQuestionAddOptionClick = this.handleQuestionAddOptionClick.bind(this);
        this.handleQuestionOptionRemoveClick = this.handleQuestionOptionRemoveClick.bind(this);


    }

    handleQuestionNameChange(sectionId, questionId, e) {
        this.props.onQuestionNameChange(sectionId, questionId, e.target.value);
    }

    handleQuestionTypeChange(sectionId, questionId, e) {
        this.props.onQuestionTypeChange(sectionId, questionId, e.target.value);
    }
    handleActiveQuestionClick(questionId) {
        this.props.onActiveQuestionClick(questionId);
    }
    handleAddQuestionClick() {
        this.props.onAddQuestionClick();
    }
    handleQuestionRemoveClick(questionId) {
        this.props.onQuestionRemoveClick(questionId);
    }
    handleQuestionOptionChange(optionId, e) {
        this.props.onQuestionOptionChange(optionId, e.target.value)
    }
    handleQuestionAddOptionClick(questionId, e) {
        this.props.onQuestionAddOptionClick(questionId);
    }
    handleQuestionOptionRemoveClick(optionId, questionId) {
        this.props.onQuestionOptionRemoveClick(optionId, questionId);
    }
    render() {
        const questions = this.props.sections.find((section) => section.id == this.props.currentSectionId).questions.map((question, index) => 
            <QuestionItem 
                question={question}
                id={question.id}
                key={question.id}
                index={index}
                editMode={this.props.editMode}
                onQuestionNameChange={(e) => this.handleQuestionNameChange(this.props.currentSectionId, question.id, e)}
                onQuestionTypeChange={(e) => this.handleQuestionTypeChange(this.props.currentSectionId, question.id, e)}
                currentQuestionId={this.props.currentQuestionId}
                onActiveQuestionClick={(e) => this.handleActiveQuestionClick(question.id)}
                onQuestionRemoveClick={(e) => this.handleQuestionRemoveClick(question.id)}
                onQuestionOptionChange={this.handleQuestionOptionChange}
                onQuestionAddOptionClick={(e) => this.handleQuestionAddOptionClick(question.id, e)}
                onQuestionOptionRemoveClick={this.handleQuestionOptionRemoveClick}
                moveQuestion={this.props.moveQuestion}
            />
        );

        return (
            <div>
                <h5 className="text-center">{this.props.sections.find((section) => section.id == this.props.currentSectionId).name}</h5>
                {questions}
                <AddQuestionItem 
                    onAddQuestionClick={(e) => this.handleAddQuestionClick()}
                />
            </div>
        );
    }
}

export default QuestionList;