import React, {Component} from 'react';
class Tips extends Component
{
    render()
    {
        return(
            <div className="modal" style={{display:this.props.display}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={this.props.closeClick}>&times;</span>
                        <h2>Helps and Tips.</h2>
                    </div>
                    <div className="modal-body">
                        <p>Press Ctrl+C for new Sticky Notes.</p>
                        <p>Press Ctrl+Q for new Check List.</p>
                    </div>
                    <div className="modal-footer">
                        <h3>This is a sample Help & Tips </h3>
                    </div>
                </div>
            </div>
        );
    }
}
export default Tips;