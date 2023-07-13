import React from "react";
import 'tachyons';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange}) => {
    return (
        <div>
            <p className="f3 white">
                {'This Magic Brain will detect faces in your images. Give it a try!'}
            </p>
            <div className="common">
                <div className="common pa4 br3 shadow-5 form">
                    <input className="f4 pa2 w-70 center" type='text' onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;