import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import CartScreenTmp from './screens/CartScreenTmp';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Header />
      <main>
      <Container>
        <Routes> 
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/product/:id' element={<ProductScreen/>} exact/>
          <Route path='/login' element={<LoginScreen/>} exact/>
          <Route path='/register' element={<RegisterScreen/>} exact/>
          <Route path='/profile' element={<ProfileScreen/>} exact/>
          <Route path="/cart/:id" element={<CartScreenTmp/>}/>
          <Route path="/cart" element={<CartScreenTmp/>}/>
        </Routes>
      </Container>
      </main>
      <Footer />
    </Router>
    
  );
}

export default App;
