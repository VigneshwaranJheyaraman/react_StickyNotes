import React, {Component} from 'react';
class Note extends Component
{
    render()
    {
        return (
            <li>  
            <button style={{backgroundColor: this.props.color,left:this.props.left, top:this.props.top}} 
                onClick={this.props.disable} draggable={this.props.draggable} 
                    onDragStart={(e) => {this.props.onDragStart(this.props.value,e)}}>
                <input type="color" className="colorChooser" onChange = {(e) => {
                    this.props.colorChange(e.target.value,e.target.nextElementSibling.innerHTML);
                }} value={this.props.color}/>
                <h2 onClick = {(e) => {
                    this.props.titleChange(e.target.innerHTML, "title");
                }} style={this.props.val ? {textDecoration:"line-through"}:{textDecoration:"none"}}>{this.props.title}</h2>
                <p onClick = {(e) => {
                    this.props.titleChange(e.target.innerHTML, "note");
                }}>{this.props.note}</p>
            </button>
        </li>
        );
    }
}
export default Note;