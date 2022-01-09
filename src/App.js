import React, {Fragment,useContext} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import Header from "./components/layout/Header"
import Navegation from './components/layout/Navegation';
//Client components
import Clients from './components/clients/Clients';
import NewClient from './components/clients/NewClient';
import EditClient from './components/clients/EditClient';
//Product components
import Products from './components/products/Products';
import EditProduct from './components/products/EditProduct';
import NewProduct from './components/products/NewProduct';
//Order components
import Orders from './components/orders/Orders';
import NewOrder from './components/orders/NewOrder';
//Authenticantion Components
import SignIn from './components/auth/SignIn';
//Context
import { CRMContext,CRMProvider } from './context/CRMContext';

function App() {

  //Use context
  const [auth, saveAuth] = useContext(CRMContext);

    return (
      <Router>
        <Fragment>
          <CRMProvider value={ [auth, saveAuth]} >
              <Header/>
              <div className='grid contenedor contenedor-principal'>
                <Navegation/>
                <main className='caja-contenido col-9'>
                    <Routes>
                      <Route path = "/signIn" element={<SignIn/>}/>

                      <Route path = "/" element= {<Clients/>} />
                      <Route path = "/clients/new" element = {<NewClient/>}/>
                      <Route path = "/clients/edit/:id" element={<EditClient/>}/>

                      <Route path = "/products" element= {<Products/>} />
                      <Route path = "/products/new" element= {<NewProduct/>} />
                      <Route path = "/products/edit/:id" element= {<EditProduct/>} />
                      
                      <Route path = "/orders" element= {<Orders/>} />
                      <Route path = "/orders/new/:id" element= {<NewOrder/>} />
                    </Routes>
                </main>
              </div>
            </CRMProvider>
        </Fragment>
    </Router>

    );
}

export default App;
