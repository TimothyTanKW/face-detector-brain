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
      imgUrl: '',
      box: {}
    }
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
    this.setState({box : box})
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
    return (
      <div>
        <ParticlesBg type="cobweb" num={200} color="#D3CEFC" />
        <Navigation />
        <Logo />
        <Rank />
        <FaceDetection onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <RenderImg imgUrl={this.state.imgUrl} box={this.state.box}/>
      </div>
    );
  }
}


export default App;
