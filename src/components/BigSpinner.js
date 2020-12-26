import React from 'react';

export default () => {
    return (
        <div className="d-flex justify-content-center"
            style={{position:'fixed', top:'45%', width:'100%'}}>
            <div className="spinner-border" style={{height:'100px', width:'100px'}}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>)
}