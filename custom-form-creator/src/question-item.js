import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './item-types';
import QuestionTypeSelect from './question-type-select.js';
import QuestionTitle from './question-title.js';
import NumberQuestion from './number-question.js';
import DropdownQuestion from './dropdown-question.js';
import TextQuestion from './text-question.js';

const questionSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        }
    }
}

const questionTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
            return;
        }

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        const clientOffset = monitor.getClientOffset();

        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        props.moveQuestion(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex;
    }
}

{/* Displays a single question */}
@DropTarget(ItemTypes.QUESTION, questionTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.QUESTION, questionSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
class QuestionItem extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        moveQuestion: PropTypes.func.isRequired,
    }
    
    render() {
        const question = this.props.question;

        const {
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props
        let questionEl = ''
        switch(question.questionType) {
            case 'text':
                questionEl = (
                    <TextQuestion 
                        question={question}
                        editMode={this.props.editMode}
                    />
                );
                break;
            case 'number':                
                questionEl = (
                    <NumberQuestion 
                        question={question}
                        editMode={this.props.editMode}
                    />
                );
                break;
            case 'dropdown':
                questionEl = (
                    <DropdownQuestion 
                        question={question}
                        editMode={this.props.editMode}
                        onQuestionOptionChange={this.props.onQuestionOptionChange}
                        onQuestionOptionRemoveClick={this.props.onQuestionOptionRemoveClick}
                        onQuestionAddOptionClick={this.props.onQuestionAddOptionClick}
                    />
                );
                break;
        }
        const questionItem = (
            <div onClick={this.props.onActiveQuestionClick} className={"p-2 m-2 border border-primary rounded "+((question.id == this.props.currentQuestionId)?"active-question": "")} >
                <div className="form-row">
                    <div className="col-6">
                        <QuestionTitle
                            question={question}
                            onChange={this.props.onQuestionNameChange}
                        />
                    </div>
                    <div className="col-3 offset-3">                        
                        <QuestionTypeSelect
                            questionType={question.questionType}
                            onChange={this.props.onQuestionTypeChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-6">
                        {questionEl}
                    </div>
                    <div className="col-3 offset-3 d-flex align-content-end">
                        <button
                            type="button"
                            className="btn btn-danger btn-sm ml-auto float-right mt-auto"
                            onClick={this.props.onQuestionRemoveClick}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            </div>           
        );

        const opacity = isDragging? 0 : 1;
        return connectDragSource(
            connectDropTarget(<div style={{opacity}}>{questionItem}</div>)
        )
    }
}
export default QuestionItem;