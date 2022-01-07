import React, {useEffect,useState,Fragment} from 'react';
import { Link } from 'react-router-dom';

import clienteAxios from "../../config/axios";
import Client from './Client';
const Clients = () => {

    const [clients,addClients] = useState([]); 

    const consultarAPI = async ()=>{
        const query = await clienteAxios.get("/clients");
        addClients(query.data);
    }

    useEffect(()=>{
        consultarAPI(); 
    },[])

    return ( 
        
        <Fragment>
            <h1>Cliets</h1>
            <Link to={"/clients/new"} className='btn btn-verde nvo-cliente'>
                New Client
                <i className='fas fa-plus-circle'></i>
            </Link>

            <ul className='listado-clientes'>
                {clients.map(client=>(
                    <Client
                        key={client._id}
                        client = {client}
                    />
                ))}
            </ul>
        </Fragment>
    );
}
 
export default Clients;