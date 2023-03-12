import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceDetection from './components/FaceDetection/FaceDetection';
import RenderImg from './components/RenderImg/RenderImg';
import ParticlesBg from 'particles-bg';


const initialState = {
  input: '',
  imgUrl: '',
  box: {},
  route: 'signin',
  signedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ signedIn: true })
    }
    this.setState({ route: route })
  }

  calculateFace = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const theImg = document.getElementById('renderImg');
    const imgWidth = Number(theImg.width);
    const imgHeight = Number(theImg.height);
    return {
      leftCol: clarifaiFace.left_col * imgWidth,
      topRow: clarifaiFace.top_row * imgHeight,
      rightCol: imgWidth - (clarifaiFace.right_col * imgWidth),
      bottomRow: imgHeight - (clarifaiFace.bottom_row * imgHeight)
    }
  }

  displayBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmit = () => {
    this.setState({ imgUrl: this.state.input });
      fetch('https://dull-red-walkingstick-tutu.cyclic.app/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://dull-red-walkingstick-tutu.cyclic.app/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {
                entries: count
              }))
            })
            .catch(console.log)
        }
        this.displayBox(this.calculateFace(response));
      })
      .catch(err => console.log(err))
  }

  //http://localhost:3000/image

  render() {
    const { imgUrl, box, route, signedIn } = this.state;
    return (
      <div>
        <ParticlesBg type="cobweb" num={200} color="#D3CEFC" />
        <Navigation onRouteChange={this.onRouteChange} signedIn={signedIn} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <FaceDetection onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <RenderImg imgUrl={imgUrl} box={box} />
          </div>
          : (
            route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}


export default App;
