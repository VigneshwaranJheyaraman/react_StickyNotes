import React, {Component} from 'react';
import Tips from './Tips';
import Menu from './Menu';
import { getStickyBoardFromLocalStorage, setStickyNotesToLocalStorage, getLastLengthForStickyBoardFromLocalStorage } from '../stickyBoardUtil';
import NewStickyNoteModal from './NewStickyNoteModal';
import Note from './Note';
import NotFound from './NotFound';
class StickyBoard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            helpAndTipsDisplay:"none",
            menuDisplay: "none",
            menuLeft: "",
            menuTop:"",
            stickyNoteModalDisplay:"none",
            BoardId:"",
            stickyBoard: {
                lastLength:0,
                sNotes:{}
            },
            lastLength:0
        };
        this.customContextMenu = this.customContextMenu.bind(this);
        this.dropStickyNotes = this.dropStickyNotes.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
        this.storenewStickyNote = this.storenewStickyNote.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
    }
    componentWillMount()
    {   
        var stickyboard = getStickyBoardFromLocalStorage(`board${this.props.match.params.id}`);
        if(stickyboard !==  null)
        {
            this.setState({ stickyBoard: stickyboard, lastLength: getLastLengthForStickyBoardFromLocalStorage()});
        }
        window.addEventListener("click", (e) => {
            this.setState({menuDisplay:"none"});
        })
        window.onblur = (e) => {
            this.setState({menuDisplay:"none"});
        }
    }
    componentWillUpdate()
    {
        setStickyNotesToLocalStorage(`board${this.props.match.params.id}`, this.state.stickyBoard, this.state.lastLength);
    }
    customContextMenu(e)
    {
        //custom context menu display
        e.preventDefault();
        this.setState(
            {
                menuDisplay:"block",
                menuLeft: `${e.pageX - 50}px`,
                menuTop: `${e.pageY}px`
            }
        );
    }
    dropStickyNotes(e)
    {
        //insert the stickyNotes in position
        console.log(e.target);
        var stickyId = parseInt(e.dataTransfer.getData("key"));
        var updatedStickyNote = this.state.stickyBoard.sNotes[stickyId];
        updatedStickyNote.left =  `${e.pageX-120 / 2}px`;
        updatedStickyNote.top = `${e.pageY}px`;
        this.setState({stickyBoard:{
            ...this.state.stickyBoard,
            sNotes:{
                ...this.state.stickyBoard.sNotes,
                [stickyId]:updatedStickyNote
            }
        }});
    }
    addNewTask()
    {
        //new task from modal
        this.setState({stickyNoteModalDisplay:"block"});
    }
    startDrag(value, e)
    {
        //send the key value of the sticky note;
        e.dataTransfer.setData("key", value);
        console.log(e.target);
    }
    storenewStickyNote(newStickyNote)
    {
        var previousId = this.state.lastLength;
        this.setState({lastLength: ++previousId});
        this.setState({
            stickyBoard: {
                ...this.state.stickyBoard,
                sNotes:
                {
                    ...this.state.stickyBoard.sNotes,
                    [this.state.lastLength]:newStickyNote
                }
            }});
    }
    changeColor(color, title)
    {
        var newStickyNote= Object.entries(Object.assign({}, this.state.stickyBoard.sNotes)).map((v,i) => {
            if(v[1].title === title)
            {
                v[1].color = color;
            }
            return v[1];
        });
        var newStickyBoard = this.state.stickyBoard;
        newStickyBoard.sNotes = Object.assign({}, newStickyNote);
        this.setState({stickyBoard: newStickyBoard});
    }
    changeTitle(titleOrNote, topic)
    {
        if(topic === "title") 
        {            
            var tvalue = prompt("Enter the task " + titleOrNote)
            tvalue= tvalue !== "" && tvalue !== null? tvalue: this.state.BoardId;
        }
        else
        {
            tvalue = prompt("Enter the note " + titleOrNote)
            tvalue= tvalue !== "" && tvalue !== null? tvalue: this.state.BoardId;
        }
        var updatedStickyNotes = Object.entries(Object.assign({}, this.state.stickyBoard.sNotes)).map((k,v) => {
            console.log(k[1].title, titleOrNote, tvalue);
            if(topic === "title")
            {
                if(k[1].title === titleOrNote || k[1].title ===  null)
                {
                    k[1].title = tvalue;
                }
            }
            else
            {                
                if(k[1].note === titleOrNote || k[1].note ===  null)
                {
                    k[1].note = tvalue;
                }
            }
            return k[1];
        });
        this.setState({
            stickyBoard: {
                ...this.state.stickyBoard,
                sNotes:Object.assign({}, updatedStickyNotes)
            }
        });
    }
    render()
    {
        if (parseInt(localStorage.getItem("nB")) < parseInt(this.props.match.params.id))
        {
            localStorage.removeItem(`board${this.props.match.params.id}`); 
            return <NotFound />
        }
        else
        {
            return (
                <div className="stickyBoard" onContextMenu={this.customContextMenu}  onDragOver={(e) => {e.preventDefault();}} onDrop={this.dropStickyNotes}>
            <div>
                <Tips display = {this.state.helpAndTipsDisplay} />
                <Menu display= {this.state.menuDisplay} newTask={this.addNewTask} top={this.state.menuTop} left={this.state.menuLeft} onlyOneTask={true}/>
                <div>
                    <ul>
                        {
                            Object.entries(this.state.stickyBoard.sNotes).map((v,i) => {
                                return <Note title={v[1].title} note={v[1].note} key={i} titleChange = {this.changeTitle}
                                    colorChange={this.changeColor} color={v[1].color} val={false} value={v[0]}
                                     draggable={true} onDragStart={this.startDrag} left={v[1].left} top={v[1].top}/>
                            })
                        }
                    </ul>
                </div>
                <NewStickyNoteModal display={this.state.stickyNoteModalDisplay} newStickyNote={this.storenewStickyNote} closeModal={(e) => {this.setState({stickyNoteModalDisplay:"none"})}} />
            </div>
        </div>
            );
        }
    }
}
export default StickyBoard;