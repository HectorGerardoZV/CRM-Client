import React, {Fragment} from 'react';

const ProductQuantity = (props) => {
        const {product,productPlus,productLest,index,deleteProduct} = props;
    return ( 
        <Fragment>
            <li>
                <div className="texto-producto">
                    <p className="nombre">{product.name}</p>
                    <p className="precio">${product.price}</p>
                </div>
                <div className="acciones">
                    <div className="contenedor-cantidad">
                        <i className="fas fa-minus"
                            onClick={()=>productLest(index)}
                        ></i>
                        <p>{product.quantity}</p>
                        <i className="fas fa-plus"
                            onClick={()=>productPlus(index)}
                        ></i>
                    </div>
                    <button type="button" className="btn btn-rojo"
                         onClick={()=>deleteProduct(product._id)}
                    >
                        <i className="fas fa-minus-circle"></i>
                            Delete product
                    </button>
                </div>
            </li>
        </Fragment>
     );
}
 
export default ProductQuantity;