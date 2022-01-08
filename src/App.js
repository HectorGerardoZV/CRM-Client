import React, {Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import Header from "./components/layout/Header"
import Navegation from './components/layout/Navegation';
//Clients components
import Clients from './components/clients/Clients';
import NewClient from './components/clients/NewClient';
import EditClient from './components/clients/EditClient';
import Products from './components/products/Products';
import Orders from './components/orders/Orders';

function App() {
    return (
      <Router>
        <Fragment>
            <Header/>
            <div className='grid contenedor contenedor-principal'>
              <Navegation/>
              <main className='caja-contenido col-9'>
                  <Routes>
                    <Route path = "/" element= {<Clients/>} />
                    <Route path = "/products" element= {<Products/>} />
                    <Route path = "/orders" element= {<Orders/>} />
                    <Route path = "/clients/edit/:id" element={<EditClient/>}/>
                    <Route path = "/clients/new" element = {<NewClient/>}/>
                  </Routes>
              </main>
            </div>
        </Fragment>
    </Router>

    );
}

export default App;
