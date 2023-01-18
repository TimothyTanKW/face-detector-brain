import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
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
      imgUrl: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onSubmit = () => {
    console.log('click');

    // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
    // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
    // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
    // If that isn't working, then that means you will have to wait until their servers are back up. 

    // Old Way:
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)

    // New Way:
    app.models
      .predict(
        {
          id: 'face-detection',
          name: 'face-detection',
          version: '6dc7e46bc9124c5c8824be4822abe105',
          type: 'visual-detector',
        }, this.state.input)
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <ParticlesBg type="cobweb" num={200} color="#D3CEFC" />
        <Navigation />
        <Logo />
        <Rank />
        <FaceDetection onInputChange= {this.onInputChange} onSubmit={this.onSubmit}/>
        <RenderImg  />
      </div>
    );
  }
}


export default App;
