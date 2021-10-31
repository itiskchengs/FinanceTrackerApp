import Home from './pages/Home';

function App() {

  fetch("http://localhost:3001/api/users")
  .then(res => res.json())
  .then(data => console.log(data));

  return (
    <Home />
  );
}

export default App;
