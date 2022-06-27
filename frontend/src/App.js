import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes> 
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/product/:id' element={<ProductScreen/>} exact/>
          <Route path="/cart/:id" element={<CartScreen/>}/>
          <Route path="/cart" element={<CartScreen/>}/>
        </Routes>
      </Container>
      <Footer />
    </Router>
    
  );
}

export default App;
