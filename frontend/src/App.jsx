import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import { SignPage } from './pages/SignPage';

function App() {
  return (

    <Router>
        <Routes>
          <Route path="/" element={<LoginPages />}>  </Route>
          <Route path="/cadastrar" element={<SignPage/>}> </Route>
        </Routes>
    </Router>
   
     


  );
}

export default App;