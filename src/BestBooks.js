import React from 'react';
import axios from 'axios';
import { withAuth0, useAuth0 } from '@auth0/auth0-react';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image, Button } from 'react-bootstrap/';
import Jumbotron from 'react-bootstrap/Jumbotron';
import AddBook from './components/AddBook.js'
import './BestBooks.css';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bookData: [],
      showBook: false,
      e_mail: '',
      displayModal: false,
      server : process.env.REACT_APP_SERVER
    }
  }
  hideModal = () => { this.setState({ displayModal: false }); }
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

                  </Card.Body>
                </Card>
              )
            })
          }
        </div>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);