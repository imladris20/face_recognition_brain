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

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'Signin',
  isSigned: false,
  user: {
    id:'',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  //  Testing to plug in to the backend end points
  //  後端有設定如果root被get到時，會回傳database.user
  /* componentDidMount(){
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(console.log);
  } */

  boxLocationCalculation = (result) => {
    const faceSource = result.outputs[0].data.regions.map(eachregion => eachregion.region_info.bounding_box);
    //  faceSource 是一個array，每個index裝了每張臉的邊界資訊，也就是object
    //  例如：{top_row: 0.54057693, left_col: 0.24122444, bottom_row: 0.73186797, right_col: 0.3427886}
    //  因此也要return一個裝滿換算過資訊的object的array

    const image = document.getElementById('inputImage') ;
    const width = Number(image.width);
    const height = Number(image.height);
    return faceSource.map( eachface => {
      return {
        topRow: eachface.top_row * height,
        bottomRow: height - (eachface.bottom_row * height),
        leftCol: eachface.left_col * width,
        rightCol: width - (eachface.right_col * width)
      }
    });
  }

  displayBox = (boxes) => {
    console.log(boxes);
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonClick = () => {
    console.log("You just clicked");
    const {input} = this.state;
    this.setState({imageUrl: input});

    //  如果括號裡面寫(this.state.imageUrl)會發生400錯誤，可試試看，這是進階議題
    fetch('https://face-recognition-brain-api-79k5.onrender.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.input
        })
    })
      .then(response => {
        console.log("after first fetch", response);
        response.json();
      })  
      .then(result => {
        console.log("before get into second fetch", result);
        if(result) {
          fetch('https://face-recognition-brain-api-79k5.onrender.com/image', {
            method:'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(data => {
              this.setState(Object.assign(this.state.user, {entries: data}))
            })
            .catch( error => console.log('something went wrong', error));
        }
        this.displayBox(this.boxLocationCalculation(result));
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (page) => {
    if ( page === "Home") {
      this.setState({isSigned: true});
    } else if ( page === "Signin") {
      this.setState(initialState);
    }
    this.setState({route: page});
  }

  // onRouteBack = () => {
  //   this.setState({route: 'Signin'});
  // }

  render(){
    const {imageUrl, boxes, route, isSigned, user} = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" num={150} bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSigned={isSigned} />
        {route === 'Home' ?
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonClick={this.onButtonClick}
            />
            <FaceRecognition
              boxes={boxes} 
              imageUrl={imageUrl}
            />
          </div>
          :
          (route === 'Signin'
          ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          :<Registration loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> )
        }
      </div>
    );
  }
}

export default App;

//  example pictures 01:https://www.kpopdays.com/wp-content/uploads/2022/09/TW06.png
//  example pictures 02:https://img.ltn.com.tw/Upload/style/page/2023/03/06/230306-24520-1-4OWtF.jpg
//  example pictures 03:https://i.ytimg.com/vi/FGKWuSjA_44/maxresdefault.jpg