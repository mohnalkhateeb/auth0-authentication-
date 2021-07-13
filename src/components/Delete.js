import React, { Component } from 'react'

export class Delete extends Component {
    
    render() {
        return (
            <>
                
              <button onClick={()=>this.props.deleteBook(this.props.idx)}>Delete</button>
            
            </>
        );
    }
}

export default Delete