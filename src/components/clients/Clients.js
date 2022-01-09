import React, {useEffect,useState,Fragment,useContext} from 'react';
import { Link } from 'react-router-dom';

import clienteAxios from "../../config/axios";
import Client from './Client';
import Spinner from "../layout/Spinner";
import { CRMContext } from '../../context/CRMContext';
import { useNavigate } from 'react-router-dom';

const Clients = () => {
    let navigate = useNavigate();
    const [clients,addClients] = useState([]); 
    const [auth, saveAuth]= useContext(CRMContext);
    const {token} = auth;
    const consultarAPI = async ()=>{
       try {
            const query = await clienteAxios.get("/clients",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        addClients(query.data);
       } catch (error) {
        navigate("/signIn");
       }
       
    }

    useEffect(()=>{
        if(token!==""){
            consultarAPI(); 
        }else{
            navigate("/signIn");
        }
        
    },[clients])

    if(auth.token===""){
        navigate("/signIn");
    }
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