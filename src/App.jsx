import * as React from 'react';
<<<<<<< HEAD
import Broad from './pages/Broads/_id';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {publicRoutes} from './routes/index.jsx';

>>>>>>> vuongpm


function App() {
  return (
<<<<<<< HEAD
    <>
    <Broad/>
    </>
=======
    <Router>
      <div className='App'>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page/>} />;
          })}
        </Routes>
      </div>
    </Router>
>>>>>>> vuongpm
  )
}

export default App
