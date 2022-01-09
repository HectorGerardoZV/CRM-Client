import React, {useState, useEffect, Fragment} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import ProductFinder from './ProductFinder';
import Swal from 'sweetalert2';
import ProductQuantity from './ProductQuantity';
const NewOrder = () => {

    let navigate = useNavigate();
    const{id} =useParams();
    //State
    const [client, saveClient] = useState({});
    const [search, saveSearch]= useState("");
    const [products, addProduct]= useState([]);
    const [total, calculateTotal] = useState(0);

    //Effects
    useEffect(()=>{
        queryClient();
        calculate();
    },[products])


    //Functions
    const queryClient = async()=>{
        const clientOBJ = await clienteAxios.get(`/clients/${id}`);
        saveClient(clientOBJ.data);
    }
    const searchProduct = async(e)=>{
        e.preventDefault();
        
        const res = await clienteAxios.post(`/products/search/${search}`);
        const data = res.data;

        if(data){
            let response = data;
            response.product = data._id;
            response.quantity = 0;
            addProduct([...products, response]);
           
        }else{
            Swal.fire(
                'Error!',
                "The product doesn't exist",
                'error'
              )
        }
        
        
    }
    const readProductData = (e)=>{
        saveSearch(e.target.value.trim());
    }
    const productPlus = index=>{
        products[index].quantity++;
        const updateProducts = [...products];
        addProduct(updateProducts)
    }
    const productLest = index=>{
        if(products[index].quantity===0){
            return;
        }
        products[index].quantity--;
        const updateProducts = [...products];
        addProduct(updateProducts)
    }
    const calculate = ()=>{

        if(products.length===0){
            calculateTotal(0);
            return;
        }

        let totalCount = 0;
        products.map(product=>totalCount+=(product.quantity*product.price));
        calculateTotal(totalCount)
       
    }
    const deleteProduct = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this product?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: "No"
          }).then((result) => {
            if (result.isConfirmed) {
              let productsArray =products.filter(product=>product._id!==id);

              addProduct(productsArray);

              Swal.fire(
                'Deleted!',
                'Product deleted',
                'success'
              )
            }
          })
    }
    const addOrder = async(e)=>{
        e.preventDefault();
        let order = {
            client: id,
            products,
            total
        }
       const response = await clienteAxios.post("/orders",order);
       const {data}= response;
       if(data.message){
        
        Swal.fire(
            'Good!',
            data.message,
            'success'
          )
          navigate("/orders");
       }else{

        Swal.fire(
            'Error!',
            data.error,
            'error'
          )
       }

    }
    return (  
        <Fragment>
            <h2>New order</h2>

            <div className="ficha-cliente">
                <h3>Client Information</h3>
                <p>Full Name: {client.name} {client.lastName}</p>
                <p>Email: {client.email}</p>
                <p>Phone Number: {client.phoneNumber}</p>
            </div>
            <ProductFinder
                searchProduct={searchProduct}
                readProductData={readProductData}
            />
            

                <ul className="resumen">
                    {products.map((product,index)=>(
                            <ProductQuantity
                               key={product.product}
                               product={product}
                               productPlus={productPlus}
                               productLest={productLest}
                               deleteProduct={deleteProduct}
                               index={index}
                            />
                        ))}
                    
                </ul>
                
                <p className='total'>Total: <span>$ {total}</span></p>
                {
                    total>0?(
                        <form
                            onSubmit={addOrder}
                        >
                            <div className="enviar">
                                <input type="submit" className="btn btn-azul" value="Add Order"/>
                            </div>
                        </form>
                    ):null
                }
                
           
        </Fragment>

    );
}
 
export default NewOrder;