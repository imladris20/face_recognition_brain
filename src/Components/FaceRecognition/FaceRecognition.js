import React from "react";
import 'tachyons';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className="common ma">
            <div className="absolute mt2">
                <img id='inputImage' alt='' src={imageUrl} width="500px" height="auto" />
                {
                    boxes.map((box,i) => {
                        const {topRow, bottomRow, leftCol, rightCol} = box;
                        return (<div key={i} className="box-bounding" style={{top: topRow, bottom: bottomRow, left: leftCol, right: rightCol}}></div>)
                    })
                }   
            </div>
        </div>
    )
}

export default FaceRecognition;