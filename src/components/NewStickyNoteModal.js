import React, {Component} from 'react';
class NewStickyNoteModal extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            userInput:'',
            userNote: '',
            stickyNote: {color:"#f4f4f4"}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
    }
    handleInputChange(e)
    {
        this.setState({userInput: e.target.value});
        this.setState({stickyNote : {
            ...this.state.stickyNote,
            title: e.target.value
        }});
    }
    handleNoteChange(e)
    {
        this.setState({userNote:e.target.value});
        this.setState({stickyNote : {
            ...this.state.stickyNote,
            note: e.target.value
        }});
    }
    render()
    {
        return (
            <div className="modal" style={{display:this.props.display}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={this.props.closeModal}>&times;</span>
                        <h2>Enter the CheckList.</h2>
                    </div>
                    <div className="modal-body">
                        <input type="text" placeholder="Enter the new task" value={this.state.userInput} 
                        onChange={this.handleInputChange} />
                        <input type="text" placeholder="Enter the new task" value={this.state.userNote} 
                        onChange={this.handleNoteChange} />
                        <span className="close" style={{fontSize:"40px", float:"none"}} 
                        onClick={(e) => {this.props.newStickyNote(this.state.stickyNote);this.setState({userInput:'', userNote:'', stickyNote:{}})}}>&#43;</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default NewStickyNoteModal;