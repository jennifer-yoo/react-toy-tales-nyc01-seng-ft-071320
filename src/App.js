import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    array: [],
    display: false
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => this.setState(() => ({array: data})))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  submitHandler = (obj) => {
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState((previousState) => ({array: [...previousState.array, data]})) 
    })
  }

  deleteHandler = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(data => {
      let newArray = this.state.array.filter(el => el.id !== parseInt(id))
      this.setState(() => ({array: newArray}))
    })
  }

  clickHandler = (obj) => {
    // let newLikes = obj.likes + 1

    fetch(`http://localhost:3000/toys/${obj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        likes: obj.likes + 1
      })
    })
    .then(resp => resp.json())
    .then(data => {
      let newArray = [...this.state.array]
      let likedToy = newArray.find(el => el.id == obj.id)
      likedToy.likes = data.likes
      this.setState(() => ({array: newArray}))
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm submitHandler={this.submitHandler}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.array} deleteHandler={this.deleteHandler} clickHandler={this.clickHandler}/>
      </>
    );
  }

}

export default App;
