import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// import  Card  from 'react-bootstrap/Card';
// import { Modal, Button } from 'react-bootstrap'

class Update extends React.Component {
    render(){
  
        
    
        return (
          <Modal show={this.props.disUpdateModal} onHide={this.props.hideUpdateModal}>
          <Modal.Dialog>
            <Modal.Header>
              {/* <h2>{this.props.title}</h2> */}
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={this.props.updateBook}>
                <input  type="text" name='bookName' defaultValue ={this.props.upData.name}/><br/><br/>
                <input  type="text" name='bookImg' defaultValue= {this.props.upData.img}/><br/><br/>
                <input  type="text" name='bookDescription'  defaultValue = {this.props.upData.description }/><br/><br/>
                <input  type="text" name='bookStatus'  defaultValue ={this.props.upData.status}/><br/><br/>
                <input type="submit" value="Update" />
            </form>
            <Button onClick = {this.props.hideUpdateModal} variant="primary" size="lg" block>C L O S E</Button>
          </Modal.Body>
          </Modal.Dialog>
          </Modal>
        )
      }
}

export default Update;