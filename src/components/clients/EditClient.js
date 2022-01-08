import React, {Fragment, useState,useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {useNavigate, useParams}  from "react-router-dom";

const EditClient = () => {
    
    const {id} = useParams();
    let navigate = useNavigate();
    const [client, clientData] = useState({
        name: "",
        lastName: "",
        company: "",
        phoneNumber: "",
        email: ""
    });

    const APIQuery = async()=>{
        const clientQuery = await clienteAxios.get(`/clients/${id}`);
        const clientOBJ = clientQuery.data;
        clientData(clientOBJ);
    }
    useEffect(()=>{
        APIQuery();
    },[]);

    const updateState = e =>{
        clientData({
            ...client,
            [e.target.name]: e.target.value
        })
    }

    const validForm = () =>{
        let {name, lastName, email, phoneNumber, company} = client;
        name = name.trim();
        lastName = lastName.trim();
        email = email.trim();
        phoneNumber = phoneNumber.trim();
        company = company.trim();
        let valid = !name.length || !lastName.length || !email.length || !phoneNumber.length || !company.length 
        return valid;
    }

    const updateClient = e =>{
        e.preventDefault();
        clienteAxios.put(`/clients/${id}`, client)
        .then(res=>{
            if(!res.data.error){
                Swal.fire(
                    'Good!',
                    "The client was edited",
                    'success'
                  )
                  navigate("/");
            }else{
                Swal.fire(
                    'Error!',
                    res.data.error,
                    'error'
                  )
            }
        })
    }
    

    return ( 
        <Fragment>
            <h2>Edit client</h2>
            <form
                onSubmit={updateClient}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Name:</label>
                    <input type="text" placeholder="Client name" name="name" defaultValue={client.name}
                        onInput={updateState}
                    />
                </div>
                <div className="campo">
                    <label>Last name:</label>
                    <input type="text" placeholder="Client last name" name="lastName" defaultValue={client.lastName}
                        onChange={updateState}
                    />
                </div>
                <div className="campo">
                    <label>Company:</label>
                    <input type="text" placeholder="Client Company" name="company" defaultValue={client.company}
                        onChange={updateState}
                    />
                </div>
                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Client email" name="email" defaultValue={client.email}
                        onChange={updateState}
                    />
                </div>
                <div className="campo">
                    <label>Phone Number:</label>
                    <input type="text" placeholder="Client phone number" name="phoneNumber" defaultValue={client.phoneNumber}
                        onChange={updateState}
                    />
                </div>
                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Save changes" 
                            disabled={validForm()}
                            
                        />
                </div>
            </form>
        </Fragment>
     );
}
 
export default EditClient;