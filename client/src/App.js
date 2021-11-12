import { 
  Routes,  
  Route, 
 } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {

  return (
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
  );
}

export default App;
