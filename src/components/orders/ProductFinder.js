import React, {Fragment} from 'react';

const ProductFinder = (props) => {

    const {searchProduct, readProductData} = props;

    return (  
        <Fragment>
            <form
                onSubmit={searchProduct}
            >
                <legend>Search for a product and add the quantity</legend>

                <div className="campo">
                    <label>Products:</label>
                    <input type="text" placeholder="Name product" name="products"
                        onInput={readProductData}
                    />
                </div>
                <input type={"submit"} className='btn btn-azul btn-block' value={"Search Product"}/>
            </form>
        </Fragment>
    );
}
 
export default ProductFinder;