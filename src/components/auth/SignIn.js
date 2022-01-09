import React, { Fragment, useState,useContext } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';


const SignIn = () => {

    const [auth, saveAuth] = useContext(CRMContext);

    let navigate = useNavigate();
    const [user, saveData] = useState({
        email: "",
        password: ""
    });

    const readData = e => {
        saveData({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const signIn = async (e) => {
        e.preventDefault();

        try {
            const res = await clienteAxios.post("/signIn", user);

            if (!res.data.error) {
                const { token } = res.data;
                localStorage.setItem("token",token);
                saveAuth({token, auth:true});


                Swal.fire(
                    'Good!',
                    "Valid credentials",
                    'success'
                )
                navigate("/");
            }

        } catch (error) {
            Swal.fire(
                'Error!',
                error.response.data.error,
                'error'
            )
        }
    }
    return (
        <Fragment>

            <div className='login'>
                <h2>Sign In</h2>
                <div className="contenedor-formulario">
                    <form
                        onSubmit={signIn}
                    >
                        <div className="campo">
                            <label>Email</label>
                            <input type="text"
                                name='email'
                                placeholder='Your email'
                                required
                                onInput={readData}
                            />
                        </div>
                        <div className="campo">
                            <label>Password</label>
                            <input type="password"
                                name='password'
                                placeholder='Your password'
                                required
                                onInput={readData}
                            />
                        </div>
                        <input type="submit" value="Sign In" className='btn btn-verde btn-block' />
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default SignIn;