import React, {Component} from 'react';
import CheckList from './CheckList';
class CheckLists extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {userInput: ""};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e)
    {
        this.setState({userInput: e.target.value});
    }
    render()
    {
        return (<div className="checklist">
            <input type="text" onChange={this.handleChange} placeholder="Enter the task" value={this.state.userInput}/>
            <span onClick={(e) => {this.props.addCheckList(this.state.userInput);this.setState({userInput:""})}}>Add</span>
            <ul>
                {
                    Object.entries(this.props.checklist).map((v,i) => {
                        return <CheckList disable={(e) => {this.props.disableCheckList(e.target.value)}} value={v[0]} checklist={v[1].content} 
                            val={v[1].completed} key={i}/>
                    })
                }
            </ul>
        </div>);
    }
}
export default CheckLists;