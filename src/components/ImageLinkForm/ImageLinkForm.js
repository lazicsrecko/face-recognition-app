import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = (props) => {
    const { onInputChange, onButtonSubmit } = props;

    return (
        <div className="div-link">
            <p>
                This Magic Brain will detect faces in your pictures. Give it a try!
            </p>
            <div>
                <input className="link-input" type="text" onChange={onInputChange} />
                <button className="dtc-btn" placeholder="Link"
                        onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;