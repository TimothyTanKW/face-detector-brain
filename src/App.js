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
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: '3239ca72021744f3a274b632fb899264'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
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
  }

  loadUser = (data) => {
    this.setState({user: {
      id: 'data.id',
      name: 'data.name',
      email: 'date.email',
      entries: 'data.entries',
      joined: 'data.joined'
    }
  })
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ signedIn: false })
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
    app.models
      .predict(
        {
          id: 'face-detection',
          name: 'face-detection',
          version: '6dc7e46bc9124c5c8824be4822abe105',
          type: 'visual-detector',
        }, this.state.input)
      .then(response => {
        this.displayBox(this.calculateFace(response));
      })
      .catch(err => console.log(err));
  }

  render() {
    const { imgUrl, box, route, signedIn } = this.state;
    return (
      <div>
        <ParticlesBg type="cobweb" num={200} color="#D3CEFC" />
        <Navigation onRouteChange={this.onRouteChange} signedIn={signedIn} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
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
