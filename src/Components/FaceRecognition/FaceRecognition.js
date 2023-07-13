import React from "react";
import 'tachyons';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className="common ma">
            <div className="absolute mt2">
                <img id='inputImage' alt='' src={imageUrl} width="500px" height="auto" />
                <div className="box-bounding" style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}}></div>   
            </div>
        </div>
    )
}

export default FaceRecognition;