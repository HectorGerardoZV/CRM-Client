import React,{useEffect,useState,Fragment} from 'react';
import clienteAxios from '../../config/axios';
import OrderDetail from './OrderDetail';
const Orders = () => {

    const [orders, saveOrders]= useState([]);

    const queryOrders = async()=>{
        const response = await clienteAxios.get("/orders");
        const {data} = response;
        saveOrders(data);
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