import React, { Component } from 'react';




export default class QuestionTypeSelect extends Component {
    constructor(props) {
        super(props);
        this.questionTypeNames = {
            'text': 'Short Answer',
            'number': 'Number',
            'dropdown': 'Dropdown'
        }

        this.questionTypes = [
            'text',
            'number',
            'dropdown',
        ]
    }


    getQuestionTypeOptions() {
        const questionTypeOptions = this.questionTypes.map((type) =>
            <option key={type} value={type}>{this.questionTypeNames[type]}</option>
        );

        return (questionTypeOptions);
    }

    render() {
        return (
            <select
                value={this.props.questionType}
                onChange={this.props.onChange}

                className="form-control float-right  m-1"
            >
                {this.getQuestionTypeOptions()}
            </select>
        );
    }


}