import React from 'react';
import axios from 'axios';
import { withAuth0, useAuth0 } from '@auth0/auth0-react';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image, Button } from 'react-bootstrap/';
import Jumbotron from 'react-bootstrap/Jumbotron';
import AddBook from './components/AddBook.js'
import './BestBooks.css';
import Delete from './components/Delete.js';
import Update from './components/Update.js';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bookData: [],
      showBook: false,
      e_mail: '',
      displayModal: false,
      server : process.env.REACT_APP_SERVER,
      index: 0,
      upData:[],
      disUpdateModal: false,

    }
  }
  hideModal = () => { this.setState({ displayModal: false }); }
  hideUpdateModal = () => { this.setState({ disUpdateModal: false }); }
  componentDidMount = async () => {
    const { user } = this.props.auth0;
    console.log(user);
    await this.setState({
      e_mail: `${user.email}`
    })
    // http://localhost:3003/books?userName=razan
    let url = `${this.state.server}/books?e_mail=${this.state.e_mail}`;
    console.log(url)
    let responseData = await axios.get(url);
    console.log(responseData.data)
    await this.setState({
      bookData: responseData.data,
      showBook: true
    })
    console.log(this.state.bookData)
  }

  showAddModel = () => {
    // key.preventDefault()
    this.setState({ displayModal: true })

  }
  showUpdateModel = (index) => {
    // key.preventDefault()
    console.log(this.state.bookData)
    console.log(index)
    this.setState({ disUpdateModal: true ,
    index : index,
    upData : this.state.bookData[index]
  })
  console.log(index)
  }
  addBook = async (event) => {
    event.preventDefault();
    // let bookName = event.target.bookName.value;
    // let bookImg = event.target.bookImg.value;
    // let bookDescription = event.target.bookDescription.value;
    // let bookStatus = event.target.bookStatus.value;
    // let e_mail = this.state.e_mail;

    const booksFormData = {
      bookName : event.target.bookName.value,
      bookImg : event.target.bookImg.value,
      bookDescription : event.target.bookDescription.value,
      bookStatus : event.target.bookStatus.value,
      e_mail : this.state.e_mail
    }
    // let catsData = await axios.get(`${this.state.server}/addBook?
    // catName=${bookName}&bookImg=${catBreed}&bookDescription=${bookDescription}
    // &bookStatus=${bookStatus}ownerName=${ownerName}`)
    console.log('bbbbb',booksFormData)
    let books2 = await axios.post(`${this.state.server}/addBook`, booksFormData)
    console.log(books2)
    console.log('afffaff',booksFormData)
    this.setState({
      bookData: books2.data,
      displayModal: false
    })

  }
  deleteBook = async(index) =>{
    console.log(index);
    let paramsObj = {
      e_mail:this.state.e_mail
    }
    console.log(paramsObj)
    let delbookData = await axios.delete(`${this.state.server}/deletebook/${index}`,{params:paramsObj})
    // index: req.params >> ownerName:req.query
    console.log(delbookData)
    // let catsData = await axios.delete(`${this.state.server}/deleteCat`,{params:paramsObj})
    // // index: req.query >> ownerName:req.query

    // let catsData = await axios.delete(`${this.state.server}/deleteCat?ownerName=${this.state.ownerName}&index=${index}`)
    // // index: req.query >> ownerName:req.query

    this.setState({
      bookData:delbookData.data
    })


  }
  updateBook = async(index) =>{}

  


  render() {
    return (

      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <Button onClick={this.showAddModel} variant="primary" >Add Book</Button>
          <AddBook addBook={this.addBook} displayModal={this.state.displayModal} hideModal={this.hideModal} />
        <div>
          
          {this.state.showBook &&
            this.state.bookData.map((item, index) => {
              return (
                <Card key={index} style={{ width: '20rem', backgroundColor: 'burlywood', boxShadow: '2px 2px 2px black', margin: '100px' }} >

                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>

                    <Image src={item.img} alt={item.name} style={{ width: '17rem' }} />
                    <Card.Text>
                      description: {item.description}
                    </Card.Text>
                    <Card.Text>
                      status: {item.status}
                    </Card.Text>
                  <Delete deleteBook={this.deleteBook} idx={index}/>
                  <Button onClick={()=>this.showUpdateModel(index)} variant="primary" >Update</Button>
                  </Card.Body>
                </Card>
              )
            })

          }
          <Update  updateBook={this.updateBook} disUpdateModal={this.state.disUpdateModal} hideUpdateModal={this.hideUpdateModal} upData ={this.state.upData}/>
        </div>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);