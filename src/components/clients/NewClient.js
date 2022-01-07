import React, {Fragment, useState} from 'react';
import clienteAxios from '../../config/axios';


const NewClient = () => {
    const [client, saveClient] = useState({
        name: "",
        lastName: "",
        company: "",
        phoneNumber: "",
        email: ""
    });

    
    const updateState = e =>{
        saveClient({
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

    const  addClient = (e) =>{
        e.preventDefault();
        clienteAxios.post("/clients", client)
        .then(res=>{
            if(res.data.message){
                console.log("OK");
            }else{
                console.log("BAD")
            }
        });

    }

    return ( 
        <Fragment>
            <h2>New client</h2>
            <form
                onSubmit={addClient}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Name:</label>
                    <input type="text" placeholder="Client name" name="name" 
                        onInput={updateState}
                    />
                </div>
                <div className="campo">
                    <label>Last name:</label>
                    <input type="text" placeholder="Client last name" name="lastName" 
                        onChange={updateState}
                    />
                </div>
                <div className="campo">
                    <label>Company:</label>
                    <input type="text" placeholder="Client Company" name="company" 
                        onChange={updateState}
                    />
                </div>
                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Client email" name="email" 
                        onChange={updateState}
                    />
                </div>
                <div className="campo">
                    <label>Phone Number:</label>
                    <input type="text" placeholder="Client phone number" name="phoneNumber" 
                        onChange={updateState}
                    />
                </div>
                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Add client" 
                            disabled={validForm()}
                            
                        />
                </div>
            </form>
        </Fragment>
        

     );
}
 
export default NewClient;