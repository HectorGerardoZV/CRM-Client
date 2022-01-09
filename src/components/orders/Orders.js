import React,{useEffect,useState,Fragment,useContext} from 'react';
import clienteAxios from '../../config/axios';
import OrderDetail from './OrderDetail';
import { CRMContext } from '../../context/CRMContext';
import { useNavigate } from 'react-router-dom';
const Orders = () => {
    let navigate = useNavigate();
    const [orders, saveOrders]= useState([]);
    const [auth, sageAuth] = useContext(CRMContext);
    const queryOrders = async()=>{
        if(auth.auth){
            const response = await clienteAxios.get("/orders",{
                headers:{
                    Authorization: `Bearer ${auth.token}`
                }
            });
            const {data} = response;
            saveOrders(data);
        }else{
            navigate("/signIn");
        }
       
    }
    useEffect(()=>{
        queryOrders();
    },[orders]);

    return ( 
        <Fragment>
            <h2>Orders</h2>

            <ul className="listado-pedidos">
                {
                    orders.map(order=>( 
                        <OrderDetail
                            key={order._id}
                            order={order}
                        />
                    ))
                }
            </ul>
        </Fragment>

     );
}
 
export default Orders;