import React, { Component } from 'react';
{/* Displays a single section link */}
class SectionItem extends Component {
    render() {
        if(this.props.editMode) {
            return (
                <li className="nav-item">
                    <div className="input-group">
                        <input 
                            onClick={(e) => this.props.onClick(this.props.section.id, e)}
                            value={this.props.section.name}
                            onChange={this.props.onSectionNameChange}
                            className="form-control"
                        />
                        <span 
                            id={this.props.section.id} 
                            onClick={this.props.onRemoveSectionClick}
                            className="input-group-addon btn btn-danger"
                        >
                            &times;
                        </span>
                    </div>
                </li>
            );
        }
        else {
            return (
                <li onClick={this.props.onClick} id={this.props.section.id}>{this.props.section.name}</li>
            );
        }
            
    }
}
export default SectionItem;