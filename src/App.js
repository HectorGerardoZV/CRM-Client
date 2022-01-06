import React, {Fragment} from 'react';
import Header from "./components/layout/Header"
import Navegation from './components/layout/Navegation';
function App() {
    return (
      <Fragment>
          <Header/>
          <div className='grid contenedor contenedor-principal'>
            <Navegation/>

            <main className='caja-contenido col-9'>

            </main>
          </div>
    </Fragment>
    

    );
}

export default App;
