import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
const Client = ({client}) => {
    const {_id, name, lastName, company, email, phoneNumber } = client;
   
    const deleteClient = idClient =>{
        Swal.fire({
            title: 'Do you want to delete this client?',
            text: "The client can't be recovered",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
            
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/clients/${idClient}`)
                .then(res=>{
                    if(res.data.message){
                        Swal.fire(
                            'Deleted!',
                            res.data.message,
                            'success'
                        )
                    }else{
                        Swal.fire(
                            'Error!',
                            res.data.error,
                            'error'
                        )
                    }
                })

             
            }
          })
    }

    return (
        <li className='cliente'>
            <div className='info-cliente'>
                <p className='nombre'>{name} {lastName}</p>
                <p className='empresa'>{company}</p>
                <p className=''>{email}</p>
                <p className=''>P.Number: {phoneNumber}</p>
            </div>
            <div className='acciones'>
                <Link to={`/clients/edit/${_id}`} className='btn btn-azul'>
                    Edit
                    <i className='fas fa-pen-alt'></i>
                </Link>
                <Link to={`/orders/new/${_id}`} className='btn btn-amarillo'>
                    New Order
                    <i className='fas fa-plus'></i>
                </Link>
                <button className='btn btn-rojo'
                onClick={()=>deleteClient(_id)}
                >
                    Delete
                    <i className='fas fa-times'></i>
                </button>
            </div>
        </li>
      );
}
 
export default Client;