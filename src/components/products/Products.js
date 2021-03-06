import React, {Fragment, useEffect,useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Product from './Product';
import Spinner from "../layout/Spinner";
import { CRMContext } from '../../context/CRMContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    let navigate = useNavigate();
    const [products, saveProducts] = useState([]);
    const [auth, saveAuth] = useContext(CRMContext);

    
    const queryApi = async ()=>{
        if(auth.auth){
            const productsArray = await clienteAxios.get("/products",{
                headers:{
                    Authorization: `Bearer ${auth.token}`
                }
            });
        saveProducts(productsArray.data);
        }else{
            navigate("/signIn");
        }

        
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