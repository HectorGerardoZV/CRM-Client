import React from 'react';

const Navegation = () => {
    return ( 
        <aside className='sidebar col-3'>
            <h2>Administration</h2>
            <nav className='navegacion'>
                <a href='index.html' className='clientes'>Clients</a>
                <a href='products.html' className='productos'>Products</a>
                <a href='orders.html' className='pedidos'>Orders</a>

            </nav>
        </aside>
     );
}
 
export default Navegation;