import React, { Component } from 'react';

export default class NumberQuestion extends Component {
    render() {
        const question = this.props.question;
        if(this.props.editMode) {
            return (                
                <input
                    type="number"
                    id={'question-'+question.id}
                    disabled='true'
                    placeholder='Number Answer'
                    className="form-control m-1"
                />
                       
            );
        }
        else {
            return (
                <div>
                    <label htmlFor={'question-'+question.id}>{question.name}</label>
                    <input type="number" id={'question-'+question.id} />
                </div>
            );
        }
    }
}