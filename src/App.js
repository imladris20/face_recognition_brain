// import logo from './logo.svg';
import './App.css';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Signin from "./Components/Signin/Signin";
import Registration from "./Components/Registration/Registration";
import React, { Component } from 'react';
import 'tachyons';
import ParticlesBg from 'particles-bg';
// import Clarifai from 'clarifai';

const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';  

const returnRequestOptions = (imageUrl) => {
  
  const PAT = 'e429cbb5db254b2482b6ebbe4d76f656';
  const USER_ID = 'imladris20';       
  const APP_ID = 'face_recognition_brain';
  // const MODEL_ID = 'face-detection';
  // const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions;
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'Signin',
      isSigned: false
    }
  }

  boxLocationCalculation = (result) => {
    const faceSource = result.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage') ;
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: faceSource.top_row * height,
      bottomRow: height - (faceSource.bottom_row * height),
      leftCol: faceSource.left_col * width,
      rightCol: width - (faceSource.right_col * width)
    }
  }

  displayBox = (box) => {
    console.log(box);
    this.setState({box: box});

  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonClick = () => {
    console.log("You just clicked");
    const {input} = this.state;
    this.setState({imageUrl: input});

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", returnRequestOptions(input))  //  如果括號裡面寫(this.state.imageUrl)會發生400錯誤，可試試看，這是進階議題
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.displayBox(this.boxLocationCalculation(result));
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (page) => {
    if ( page === "Home") {
      this.setState({isSigned: true});
    } else if ( page === "Signin") {
      this.setState({isSigned: false});
    }
    this.setState({route: page});
  }

  // onRouteBack = () => {
  //   this.setState({route: 'Signin'});
  // }

  render(){
    const {imageUrl, box, route, isSigned} = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" num={150} bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSigned={isSigned} />
        {route === 'Home' ?
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonClick={this.onButtonClick}
            />
            <FaceRecognition
              box={box} 
              imageUrl={imageUrl}
            />
          </div>
          :
          (route === 'Signin'
          ?<Signin onRouteChange={this.onRouteChange} />
          :<Registration onRouteChange={this.onRouteChange} /> )
        }
      </div>
    );
  }
}

export default App;

//  example pictures 01:https://www.kpopdays.com/wp-content/uploads/2022/09/TW06.png
//  example pictures 02:https://img.ltn.com.tw/Upload/style/page/2023/03/06/230306-24520-1-4OWtF.jpg
//  example pictures 03:https://i.ytimg.com/vi/FGKWuSjA_44/maxresdefault.jpg