import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import RegisterUser from './pages/RegisterUser';


function App() {
  return (

    <Router>
        <Routes>
          <Route path="/" element={<LoginPages />}>  </Route>
          <Route path="/cadastrar" element={<RegisterUser></RegisterUser>}> </Route>
        </Routes>
    </Router>
   
     


  );
}

export default App;