import React, {Component} from 'react';
class CheckList extends Component
{
    render()
    {
        return (<li onClick={this.props.disable} style={this.props.val?{textDecoration:"line-through"}:{textDecoration:"none"}} value={this.props.value}>
            {this.props.checklist}
        </li>);
    }
}
export default CheckList;