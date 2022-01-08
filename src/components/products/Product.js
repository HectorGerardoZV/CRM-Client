import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
const Product = ({product}) => {
    const {_id, name, price, image} = product;

    const deleteProduct = idProduct =>{
        Swal.fire({
            title: 'Do you want to delete this product?',
            text: "The product can't be recovered",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
            
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/products/${idProduct}`)
                .then(res=>{
                    if(res.data.message){
                        Swal.fire(
                            'Deleted!',
                            res.data.message,
                            'success'
                        )
                    }else{
                        Swal.fire(
                            'Error!',
                            res.data.error,
                            'error'
                        )
                    }
                })

             
            }
          })
    }

    return ( 
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{name}</p>
                <p className="precio">${price}</p>
                {image?
                (<img src={`http://localhost:5000/${image}`}/>):null
                }
            </div>
            <div className="acciones">
                <Link to={`/products/edit/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Edit Product
                </Link>

                <button type="button" className="btn btn-rojo btn-eliminar"
                    onClick={()=> deleteProduct(_id)}
                >
                    <i className="fas fa-times"></i>
                    Delete Product
                </button>
            </div>
        </li>
     );
}
 
export default Product;