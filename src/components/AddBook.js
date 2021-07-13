import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// import  Card  from 'react-bootstrap/Card';
// import { Modal, Button } from 'react-bootstrap'

class SelectedBeast extends React.Component {
    render(){
  
        
    
        return (
          <Modal show={this.props.displayModal} onHide={this.props.hideModal}>
          <Modal.Dialog>
            <Modal.Header>
              {/* <h2>{this.props.title}</h2> */}
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={this.props.addBook}>
                <input placeholder='Enter Book name' type="text" name='bookName' /><br/><br/>
                <input placeholder='Enter Book Imgage' type="text" name='bookImg' /><br/><br/>
                <input placeholder='Enter Book Description' type="text" name='bookDescription' /><br/><br/>
                <input placeholder='Enter Book Status' type="text" name='bookStatus' /><br/><br/>
                <input type="submit" value="Add Book" />
            </form>
            <Button onClick = {this.props.hideModal} variant="primary" size="lg" block>C L O S E</Button>
          </Modal.Body>
          </Modal.Dialog>
          </Modal>
        )
      }
}

export default SelectedBeast;