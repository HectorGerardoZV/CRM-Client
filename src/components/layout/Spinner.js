import React ,{Fragment}from 'react';
import "./Spinner.css"
const Spinner = () => {
    return ( 
        <Fragment>
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </Fragment>
     );
}
 
export default Spinner;