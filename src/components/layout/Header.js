import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';
const Header = () =>{

    let navigate = useNavigate();
    const [auth, saveAuth] = useContext(CRMContext);

    const logOut = ()=>{
        saveAuth({
            token: "",
            auth: false
        });
        localStorage.setItem("token", "");
        navigate("/signIn");
    }

    return (
        <header className='barra'>
            <div className='contenedor'>
                <div className='contenido-barra'>
                    <h1>CRM - Clients Administrator</h1>
                    {
                        auth.auth?(
                        <button className='btn btn-rojo'
                            onClick={logOut}
                        >
                        <i className='far fa-times-circle'></i>
                        Log Out
                        </button>
                        ):null
                    }
                </div>
                
            </div>
        </header>
    );
}

export default Header;