import { Button } from 'react-bootstrap'
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
export class Delete extends Component {
    
    render() {
        return (
            <>
                
              <Button onClick={()=>this.props.deleteBook(this.props.idx)} variant="primary">Delete</Button>
            
            </>
        );
    }
}

export default Delete