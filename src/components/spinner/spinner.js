import React from "react";
import './spinner.css';

const Spinner = () => {
    return (
        <section>
        <div className='sk-chasing-dots'>
            <div className='sk-child sk-dot-1'></div>
            <div className='sk-child sk-dot-2'></div>
        </div>
        </section>
    );
}

export default Spinner;