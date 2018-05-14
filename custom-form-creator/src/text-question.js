import React, { Component } from 'react';

export default class TextQuestion extends Component {
    render() {
        const question = this.props.question;
        if(this.props.editMode) {
            return (
                <input
                    type="text"
                    id={'question-'+question.id}
                    disabled='true'
                    placeholder='Short Text Answer'
                    className="form-control m-1"
                />
            );
        }
        else {
            return (
                <div>
                    <label htmlFor={'question-'+question.id}>{question.name}</label>
                    <input type="text" id={'question-'+question.id} />
                </div>
            );
        }
    }
}