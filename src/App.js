// import logo from './logo.svg';
import './App.css';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import React, { Component } from 'react';
import 'tachyons';
import ParticlesBg from 'particles-bg';

// function App() {
//   return (
//     <div className="App">
//       <Navigation />
//       {/* <Logo />
//       <rank/>
//       <ImageLinkForm  />
//       <FaceRecognition  /> */}
//     </div>
//   );
// }

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: "",
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }


  render(){
    return (
      <div className="App">
        <ParticlesBg type="cobweb" num={150} bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} />
        {/* <FaceRecognition  /> */}
      </div>
    );
  }
}

export default App;
