import React from "react";
import './logo.css';
import logo from './assets/img/logo-final.png';

function Logo() {
    const handleToggleSidebar = () => {
        document.body.classList.toggle('toggle-sidebar');
    };

    return (
        <div className="d-flex align-items-center justify-content-between">
            <a href="/" className="logo d-flex align-items-center">
                <img 
                    src={logo} 
                    alt="Logo" 
                    style={{ width: '300px', height: '300px', left: '-400px', objectFit: 'contain' }} 
                />
            </a>
            <i
                className="bi bi-list toggle-sidebar-btn"
                onClick={handleToggleSidebar}
            ></i>
        </div>
    );
}

export default Logo;
