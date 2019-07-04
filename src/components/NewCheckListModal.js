import React, {Component} from 'react';
class NewCheckListModal extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            userInput:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e)
    {
        this.setState({userInput: e.target.value});
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
                        <span className="close" style={{fontSize:"40px", float:"none"}} 
                        onClick={(e) => {this.props.addCheckList(this.state.userInput);this.setState({userInput:''})}}>&#43;</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default NewCheckListModal;