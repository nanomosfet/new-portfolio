import React, { Component } from 'react';

export default class AddQuestionItem extends Component {
    render() {
        return (
            <div className="row m-1">
                <div className="col-2 offset-6">
                    <button 
                        type="button" 
                        className="btn btn-success btn-sm"
                        onClick={this.props.onAddQuestionClick}
                    >
                        +
                    </button>
                </div>
            </div>
        );
    }
}