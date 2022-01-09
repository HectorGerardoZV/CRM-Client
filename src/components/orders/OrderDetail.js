import React,{Fragment} from 'react';
const OrderDetail = ({order}) => {
    const {client, products,total,_id} = order;
    const {name, lastName} = client;

    return (  
        <Fragment>
            <li className="pedido">
                <div className="info-pedido">
                    <p className="id">ID: {_id}</p>
                    <p className="nombre">Client: {name} {lastName}</p>

                    <div className="articulos-pedido">
                        <p className="productos">Products: </p>
                        <ul>
                            {
                                products.map(product=>(
                                    <li key={product._id}>
                                        <p>Name: {product.product.name}</p>
                                        <p>Price: ${product.product.price}</p>
                                        <p>Quantity: {product.quantity}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <p className="total">Total: {total} </p>
                    
                </div>
            </li>
        </Fragment>
    );
}
 
export default OrderDetail;