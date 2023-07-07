// import logo from './logo.svg';
import './App.css';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import React, { Component } from 'react';
import 'tachyons';


// function App() {
//   return (
//     <div className="App">
//       <Navigation />
//       {/* <Logo />
//       <ImageLinkForm  />
//       <FaceRecognition  /> */}
//     </div>
//   );
// }

class App extends Component {
  render(){
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinkForm />
        {/* <FaceRecognition  /> */}
      </div>
    );
  }
}

export default App;
