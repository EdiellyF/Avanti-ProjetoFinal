import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import LoginPages from './pages/LoginPages';
import RegisterUser from './pages/RegisterUser';


function App() {
  return (

    <Router>
        <Routes>
          <Route path="/" element={<AuthProvider><LoginPages /></AuthProvider>}>  </Route>
          <Route path="/cadastrar" element={<RegisterUser/>}> </Route>
        </Routes>
    </Router>
   
     


  );
}

export default App;