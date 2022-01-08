import React, {Fragment, useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Product from './Product';
import Spinner from "../layout/Spinner";

const Products = () => {

    const [products, saveProducts] = useState([]);


    const queryApi = async ()=>{
        const productsArray = await clienteAxios.get("/products");
        saveProducts(productsArray.data);
    }
    useEffect(()=>{
        queryApi();
    },[products]);


    if(!products.length) return <Spinner/>

    return ( 
        <Fragment>
                <h2>Productos</h2>

                <Link to={"/products/new"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                    Nuevo Producto
                </Link>

                <ul className="listado-productos">
                    {products.map(product=>(
                        <Product
                            key={product._id}
                            product={product}
                        />
                    ))}
                </ul>
        </Fragment>
     );
}
 
export default Products;