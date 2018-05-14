import React, { Component } from 'react';

export default class QuestionTitle extends Component {
    render() {
        return (
            <input
                type="text"
                value={this.props.question.name}
                onChange={this.props.onChange}
                className="form-control  m-1"
            />
        );
    }
}