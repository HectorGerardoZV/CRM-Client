import React from 'react';
import { Link } from 'react-router-dom';
const Client = ({client}) => {
    
    const {_id, name, lastName, company, email, phoneNumber } = client;
    return (
        <li className='cliente'>
            <div className='info-cliente'>
                <p className='nombre'>{name} {lastName}</p>
                <p className='empresa'>{company}</p>
                <p className=''>{email}</p>
                <p className=''>P.Number: {phoneNumber}</p>
            </div>
            <div className='acciones'>
                <Link to={"#"} className='btn btn-azul'>
                    Edit
                    <i className='fas fa-pen-alt'></i>
                </Link>
                <button className='btn btn-rojo'>
                    Delete
                    <i className='fas fa-times'></i>
                </button>
            </div>
        </li>
      );
}
 
export default Client;