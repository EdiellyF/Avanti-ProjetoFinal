import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from "./context/AuthContext";
import LoginPages from './pages/LoginPages';
import RegisterUser from './pages/RegisterUser';

import { useContext } from 'react';
import RegisterItem from './pages/RegisterItem';

const AuthRota = ({component: Component}) => {
  const {token} = useContext(AuthContext);
  return token ? <Component/> : <Navigate to="/"/>
}

function App() {
  return (
<AuthProvider>
    <Router>
      
        <Routes>
          <Route path="/" element={<AuthProvider><LoginPages /></AuthProvider>}>  </Route>
          <Route path="/cadastrar" element={<RegisterUser/>}> </Route>
          <Route path="/item/novo" element={<AuthRota component={RegisterItem} />} />
        </Routes>
        
    </Router>
   </AuthProvider>
     


  );
}

export default App;