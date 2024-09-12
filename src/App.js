import {Routes, Route} from 'react-router-dom'

import Login from '../../tedi_app/src/pages/Login'
import Signup from '../../tedi_app/src/pages/Signup'
import Home from '../../tedi_app/src/pages/Home'
import NotFound from '../../tedi_app/src/pages/NotFound'


function App() {

 
 return (
    <div>

      <Routes>
        <Route index element={<Login />} />
        <Route path='/Login'element={<Login />} />
        <Route path='/Signup'element={<Signup />} />
        <Route path='*' element={<NotFound /> } />
        { }

        <Route path='/Home'element={<Home />} />
      </Routes>
 
    </div>
  );
}

export default App;

