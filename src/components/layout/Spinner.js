import React ,{Fragment}from 'react';
import "./Spinner.css"
const Spinner = () => {
    return ( 
        <Fragment>
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </Fragment>
     );
}
 
export default Spinner;