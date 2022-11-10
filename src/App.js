import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

import Solana from './pages/Solana';
import Aptos from './pages/Aptos';

AOS.init({ duration: 2000 });
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Solana />} />
          <Route path='/solana' element={<Solana />} />
          <Route path='/aptos' element={<Aptos />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
