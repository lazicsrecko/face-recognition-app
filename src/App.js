import React, { useState } from 'react';
import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from  './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const clarifai = new Clarifai.App({
  apiKey: '9e2b8beeaf164b688c3f6df9edfe8dba'
})

function App() {
  const [userInput, setUserInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setSignedIn] = useState(false);

  const onInputChange = (event) => {
    setUserInput(event.target.value);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onSubmit = () => {
    setImageUrl(userInput);
    clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, userInput)
      .then(response => displayFaceBox(calculateFaceLocation(response)))
      .catch(err => console.log(err))
  }

  const onRouteChange = (route) => {
    if(route === 'signout') {
      setSignedIn(false);
    } else if (route === 'home') {
      setSignedIn(true);
    }
    setRoute(route);
  }
  return (
    <div className="App">
      {/* <Particles className="particles" /> */}
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home' ?
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
        :
        (
          route === 'register' 
          ? <Register onRouteChange={onRouteChange} /> 
          : <Signin onRouteChange={onRouteChange} />
        )
      }
    </div>
  );
}

export default App;
