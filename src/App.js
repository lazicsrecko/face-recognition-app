import React, { useState } from 'react';
import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';


function App() {
  const [userInput, setUserInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({});

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      entries: user.entries,
      joined: new Date()
    })
  }

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
    fetch('https://fast-tor-15674.herokuapp.com/imageurl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userInput: userInput
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://fast-tor-15674.herokuapp.com/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              setUser({ ...user, entries: count })
            })
            .catch(err => console.log(err));
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch(err => console.log(err))
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setUserInput('');
      setImageUrl('');
      setBox({});
      setRoute('signin')
      setSignedIn(false);
      setUser({});
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
          <Rank userName={user.name} userEntries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
        :
        (
          route === 'register'
            ? <Register loadUser={loadUser} onRouteChange={onRouteChange} />
            : <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
        )
      }
    </div>
  );
}

export default App;
