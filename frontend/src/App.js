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
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderScreenTmp from './screens/OrderScreenTmp';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductEditScreen from './screens/ProductEditScreen';
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
          <Route path='/shipping' element={<ShippingScreen/>} exact/>
            <Route path='/payment' element={<PaymentScreen/>} exact/>
            <Route path='/placeorder' element={<PlaceOrderScreen/>} exact/>
            <Route path='/order/:id' element={<OrderScreen/>} exact/>
          <Route path='/profile' element={<ProfileScreen/>} exact/>
          <Route path="/cart/:id" element={<CartScreenTmp/>}/>
          <Route path="/cart" element={<CartScreenTmp/>}/>
          <Route path="/user/edit/:id" element={<UserEditScreen/>}/>
          <Route path="/admin/userslist" element={<UserListScreen/>}/>
          <Route path="/admin/productslist" element={<ProductListScreen/>}/>
          <Route path="/admin/orderslist" element={<OrderListScreen/>}/>
          <Route path="/admin/product/edit/:id" element={<ProductEditScreen/>}/>
        </Routes>
      </Container>
      </main>
      <Footer />
    </Router>
    
  );
}

export default App;
