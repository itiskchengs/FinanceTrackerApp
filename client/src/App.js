import { 
  Routes,  
  Route, 
 } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {

  return (
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
  );
}

export default App;
