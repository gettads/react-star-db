import React from "react";
import './error-indicator.css';

const ErrorIndicator = () => {
    const message = 'Error. Something went wrong...';
    return(
        <div className={`error-indicator`}>
            {message}
        </div>
    );
};

export default ErrorIndicator;