import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faDownload } from '@fortawesome/free-solid-svg-icons';


function ImageCard({ image }) {
    const handleDownload = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = image.src.original;
        downloadLink.download = image.alt;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    return (
        <div className="image-card">
            <img  src={image.src.large} alt={image.alt} />
            <div className="image-details">
                <h3 className="image-title">{image.alt} (ID: {image.id})</h3>
                <div className='photographer-buttons'>
                    <div>Photographer: {image.photographer}</div>
                    <div>
                        <button>
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                        <button  onClick={handleDownload}>
                            <FontAwesomeIcon icon={faDownload} />
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default ImageCard;
