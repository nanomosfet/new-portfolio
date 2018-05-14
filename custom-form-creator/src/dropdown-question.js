import React, { Component } from 'react';

export default class DropdownQuestion extends Component {
    render() {
        const question = this.props.question;
        const getDropdownOptions = question.options.map((option, index) =>
            <li key={option.id} className="list-group-item">
                <div className="input-group">
                    <span
                        className="input-group-addon"
                    >
                        {(index+1).toString()+'.'}
                    </span>
                    <input
                        type="text"
                        id={"option-"+option.id.toString()}
                        value={option.option}
                        className="form-control"
                        onChange={(e) => this.props.onQuestionOptionChange(option.id, e)}
                    />
                     <span
                            onClick={(e) => this.props.onQuestionOptionRemoveClick(option.id, question.id)}
                            className="input-group-addon btn btn-danger"
                        >
                            &times;
                    </span>
                </div>
            </li>
        );

        const renderDropdownAddOption = (
            <li className="list-group-item">
                <div className="input-group">
                    <span
                        className="input-group-addon"
                    >
                        {(question.options.length + 1).toString() + '.'}
                    </span>
                    <input
                        type="text"
                        placeholder='New Option'
                        className="form-control"
                        onClick={this.props.onQuestionAddOptionClick}
                    />
                </div>
            </li>
        );
        if(this.props.editMode) {
            return (                
                <ol
                    className="list-group m-1"
                >
                    {getDropdownOptions}
                    {renderDropdownAddOption}
                </ol>                        
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