import React from 'react';
import ReactPlayer from 'react-player';
import './videoplayer.css';

function Videoplayer() {
    return (
        <div className="row banner-container">
            <ReactPlayer 
                url="https://www.youtube.com/watch?v=ifCQ4LqT8G8" 
                className="banner-video" 
                controls 
                playing 
                width="100%"
                height="auto"
            />
        </div>
    );
}

export default Videoplayer;