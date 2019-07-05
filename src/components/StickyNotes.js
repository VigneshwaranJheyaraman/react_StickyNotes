import React, {Component} from 'react';
import Button from './Button';
import Note from './Note';
import Menu from './Menu';
import {getCheckListArray} from '../redux/selector';
import {addCList, toggleCList} from '../redux/actions';
import { connect } from 'react-redux';
import CheckLists from './CheckLists';
import Tips from './Tips';
import NewCheckListModal from './NewCheckListModal';
import {Link} from 'react-router-dom';
import {setLocalStorage, getLastIdfromLocalStorage, getCheckListFromLocalStorage, getStickyNotesFromLocalStorage, getBoardFlagFromLocalStorage, setBoardCountToLocalStorage} from '../util'
var cl;
export class StickyNotes extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {stickyNotes: {}, 
        lastTask:0,
        defaultTitle :"Default title",
        defaultNote:"This is the default Note",
        menuLeft:'0px',
        menuTop:'0px',
        menuDisplay:'none',
        helpAndTipsDisplay : 'none',
        checkListModalDisplay : 'none',
        boardCount: 0
        };
        this.addNewNote = this.addNewNote.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.newCheckList = this.newCheckList.bind(this);
        this.toggleCheckListRender = this.toggleCheckListRender.bind(this);
        this.customContextMenu = this.customContextMenu.bind(this);
        this.addNewCheckListFromModal = this.addNewCheckListFromModal.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.dropStickyNotes = this.dropStickyNotes.bind(this);
        this.focusTextInput = this.focusTextInput.bind(this);
    }
    addNewNote(e)
    {
        //add event to the state
        var sTitle = prompt("Enter the task");
        var sNote = prompt("Enter the note");
        var lastId = parseInt(this.state.lastTask);
        var stickyNote = {};
        sTitle = sTitle !== "" && sTitle !== null? sTitle : this.state.defaultTitle;
        sNote = sNote !== "" && sNote !== null? sNote : this.state.defaultNote;
        var color = "#f4f4f4";
        stickyNote[lastId] = {title:sTitle, note:sNote, color, left:"", top:""};
        this.setState({stickyNotes: Object.assign({}, this.state.stickyNotes, stickyNote), lastTask:lastId+=1});
    }
    changeTitle(title, topic)
    {
        let newTitle;
        if(topic === "title") 
        {            
            newTitle = prompt("Update the old Title:"+title);
            newTitle = newTitle !== "" && newTitle !== null? newTitle: this.state.defaultTitle;
        }
        else
        {
            newTitle = prompt("Update the old Note:"+title);
            newTitle = newTitle !== "" && newTitle !== null? newTitle: this.state.defaultNote;
        }
        var updatedStickyNotes = Object.entries(Object.assign({}, this.state.stickyNotes)).map((k,v) => {
            if(topic === "title")
            {
                if(k[1].title === title || k[1].title ===  null)
                {
                    k[1].title = newTitle;
                }
            }
            else
            {                
                if(k[1].note === title || k[1].note ===  null)
                {
                    k[1].note = newTitle;
                }
            }
            return k[1];
        });
        this.setState({stickyNotes: Object.assign({}, updatedStickyNotes)});

    }
    changeColor(color,title)
    {
        var updatedStickyNotes = Object.entries(Object.assign({}, this.state.stickyNotes)).map((k,v) => {
            if(k[1].title === title)
            {
                k[1].color = color;
            }
            return k[1];
        });
        this.setState({stickyNotes : Object.assign({}, updatedStickyNotes)});
    }
    newCheckList(value)
    {
        this.props.addCList(value, Object.entries(cl).length);
    }
    componentWillMount()
    {
        var lastId = getLastIdfromLocalStorage();
        var stickyNote = getStickyNotesFromLocalStorage();
        this.setState({stickyNotes: stickyNote, lastTask:lastId, boardCount:getBoardFlagFromLocalStorage()});
        cl = Object.assign({}, getCheckListFromLocalStorage());
        window.onload = (e) => {
            this.setState({helpAndTipsDisplay:"block"});
        }
        window.addEventListener("click", (e)=> {
            this.setState({menuDisplay:"none", helpAndTipsDisplay:"none"});
        });
        window.addEventListener("keyup", (event)=> {
            if(event.ctrlKey && event.keyCode === 67)
            {
                event.preventDefault();
                this.addNewNote(event);
            }
            else if(event.ctrlKey && event.keyCode === 81)
            {
                this.setState({checkListModalDisplay:"block"});
            }
            else if(event.keyCode === 27)
            {
                this.setState({helpAndTipsDisplay: "none"});
            }
        });
    }
    componentDidUpdate()
    {
        setLocalStorage(this.state.lastTask.toString(), this.state.stickyNotes, cl);
        setBoardCountToLocalStorage(this.state.boardCount);
    }
    componentWillUnmount()
    {
        window.removeEventListener("click", (e)=> {
            this.setState({menuDisplay:"none", helpAndTipsDisplay:"none"});
        });
        window.removeEventListener("blur", (e) => {
            this.setState({menuDisplay:"none", helpAndTipsDisplay:"none"});
        });
    }
    customContextMenu(nodeName,e)
    {
        e.preventDefault();
        if(nodeName !== "INPUT")
        {
            this.setState({menuLeft:`${(e.pageX-50)}px`,menuTop: `${e.pageY}px`,menuDisplay:"block"});
        }
        else
        {
            e.target.focus();
        }
    }
    focusTextInput()
    {
        this.textFocus.current.focus();
    }
    toggleCheckListRender(id)
    {
        this.props.toggleCList(id);
    }
    addNewCheckListFromModal(newcheckList)
    {
        this.props.addCList(newcheckList, Object.entries(cl).length);
    }
    startDrag(value,e)
    {
        e.dataTransfer.setData("key", value);
        e.dataTransfer.setData("node", e.target.nodeName);
        e.dataTransfer.setData("oH", e.target.offsetWidth);
        e.dataTransfer.setData("oW", e.target.offsetHeight);
    }
    dropStickyNotes(e)
    {
        if(e.dataTransfer.getData("node") === "BUTTON")
        {
            var newStickynote = this.state.stickyNotes;
            var key =parseInt(e.dataTransfer.getData("key"));
            newStickynote[key].left=`${e.pageX-(parseInt(e.dataTransfer.getData("oW"))) / 2}px`;
            newStickynote[key].top = `${e.pageY - (parseInt(e.dataTransfer.getData("oH"))) / 2}px`;
            this.setState({stickyNote:newStickynote});
        }
    }
    render()
    {
        var bc = this.state.boardCount;
        var path =`/newBoard/${bc}`;
        return (
        <div onContextMenu={(e) => {
            this.customContextMenu(e.target.nodeName,e);
        }} id="note-area" onDragOver={(e) => {e.preventDefault();}} onDrop={this.dropStickyNotes}>
                <Tips display={this.state.helpAndTipsDisplay} 
                closeClick = {(e)=> {this.setState({helpAndTipsDisplay:"none"})}}/>
                <Menu newTask={this.addNewNote} newCheckList ={this.checkList} left={this.state.menuLeft}
                top={this.state.menuTop} display = {this.state.menuDisplay} onlyOneTask={false}/>
                <div className="add-button" draggable={false}>
                    <Link to={path} target="_blank"><Button className="btn add" iclassName="fa fa-plus" onClick={(e) => {this.setState({boardCount:bc+=1})}}/></Link>
                </div>
                <div>
                    <ul>
                        {
                            Object.entries(this.state.stickyNotes).map((v,i) => {
                                return <Note title={v[1].title} note={v[1].note} key={i} titleChange = {this.changeTitle}
                                    colorChange={this.changeColor} color={v[1].color} val={false} value={v[0]}
                                     draggable={true} onDragStart={this.startDrag} left={v[1].left} top={v[1].top}/>
                            })
                        }
                    </ul>
                </div>
                <CheckLists addCheckList={this.newCheckList} checklist={cl} disableCheckList={this.toggleCheckListRender}/>
                <NewCheckListModal display={this.state.checkListModalDisplay} 
                addCheckList={this.addNewCheckListFromModal} closeModal={(e) => {this.setState({checkListModalDisplay:"none"})}}/>
            </div>);
    }
}
const mapStateToProps = store => {
    var st = getCheckListArray(store);
    cl= {...cl,
        ...st
    };
    return {cl};
}

export default connect(mapStateToProps, { addCList, toggleCList }) (StickyNotes);