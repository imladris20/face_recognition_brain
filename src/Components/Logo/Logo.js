import React from "react";
import 'tachyons';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

const Logo = () => {

    return (
        <div className="ma4 mt0">
            <Tilt className="br2 shadow-2" style={{height:'150px', width: '150px'}} scale={1.2} transitionSpeed={2000} glareEnable={true} glareMaxOpacity={0.8} glareColor="#ffffff" glarePosition="bottom" glareBorderRadius="20px">
                <div className="pa3" style={{ height: '150px', width: '150px', backgroundColor: 'linear-gradient(to right, rgb(252,200,155) , rgb(255,95,162))'}}>
                    <img style={{paddingTop: '5px'}} src={brain} alt="index logo" />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;