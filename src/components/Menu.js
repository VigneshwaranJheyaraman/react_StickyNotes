import React, {Component} from 'react';
class Menu extends Component
{
    render()
    {
        return (
            <div className="menu" id="menu" style={{left:this.props.left, top:this.props.top, display:this.props.display}}>
                <ul className="menu-options">
                    <li className="menu-option" onClick= {this.props.newTask}>Create a new task</li>
                    {
                        this.props.onlyOne ?
                        "":<li className="menu-option" onClick = {this.props.newCheckList}>Create a new Checklist</li>
                    }
                </ul>
            </div>
        );
    }
}
export default Menu;