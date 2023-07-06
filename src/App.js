// import logo from './logo.svg';
import './App.css';
import Navigation from "./Components/Navigation/Navigation";
import React, { Component } from 'react';

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
        {/* <Logo />
        <ImageLinkForm  />
        <FaceRecognition  /> */}
      </div>
    );
  }
}

export default App;
