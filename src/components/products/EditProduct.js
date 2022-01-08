import React, {useState,useEffect, Fragment} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate,useParams } from 'react-router-dom';

const EditProduct = () => {

    const {id} = useParams();

    let navigate = useNavigate();
    const [product, saveProduct] = useState({
        name: "",
        price: "",
    });
    const [file, saveFile] = useState("");

    const queryApi = async()=>{
        const productOBJ = await clienteAxios.get(`/products/${id}`);
        saveProduct(productOBJ.data);
    }

    useEffect(()=>{
        queryApi();
    },[])


    const readForm = e =>{
        saveProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }
    const readFile = e =>{
        saveFile(e.target.files[0])
    }

    const editProduct = async (e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price);
        if(file){
            formData.append("image", file);
        }
        


        try {
            const res =await clienteAxios.put(`/products/${id}`, formData,{
                headers: {"Content-Type": "multipart/form-data"}
            });
            
            if(res){
                const {data} = res;
                if(data.message){
                    Swal.fire(
                        'Good!',
                        data.message,
                        'success'
                      )
                      navigate("/products");
                }else{
                    Swal.fire(
                        'Error!',
                        data.error,
                        'error'
                      )
                }
            }

            
        } catch (error) {
            Swal.fire(
                'Error!',
                "Error, the product couldn't be added",
                'error'
              )
        }
    }


    return ( 
        <Fragment>
            <h2>Edit Product</h2>
            <form
                onSubmit={editProduct}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Name</label>
                    <input type="text" placeholder="Product name" name="name" defaultValue={product.name}
                        onChange={readForm}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="price" min="0.00" step="0.01" placeholder="Product price" defaultValue={product.price}
                        onChange={readForm}
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="image" 
                        onChange={readFile}
                    />
                </div>
                <div className='campo'>
                {product.image?
                (<img src={`http://localhost:5000/${product.image}`}/>):null
                }
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Save Changes"/>
                </div>
            </form>
        </Fragment>
     );
}
 
export default EditProduct;