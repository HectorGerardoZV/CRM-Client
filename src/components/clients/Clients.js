import React, {useEffect,useState,Fragment} from 'react';
import { Link } from 'react-router-dom';

import clienteAxios from "../../config/axios";
import Client from './Client';
import Spinner from "../layout/Spinner";

const Clients = () => {
    
    const [clients,addClients] = useState([]); 

    const consultarAPI = async ()=>{
        const query = await clienteAxios.get("/clients");
        addClients(query.data);
    }

    useEffect(()=>{
        consultarAPI(); 
    },[clients])

    if(!clients.length) return <Spinner/>
    return ( 
        <Fragment>
            <h2>Cliets</h2>
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