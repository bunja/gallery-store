import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import PaintingScreen from './screens/PaintingScreen';
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import PaintingListScreen from './screens/PaintingListScreen';
import PaintingEditScreen from './screens/PaintingEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import AboutMe from './screens/AboutMe';

function App() {
  return (
    <Router>
      <Header/>
        <main className='py-3'>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>} exact />
            <Route path="/aboutme" element={<AboutMe/>} exact />
            <Route path="/painting/:id" element={<PaintingScreen/>} />
            <Route path="/cart" element={<CartScreen/>} />
            <Route path="/login" element={<LoginScreen/>}/>
            <Route path="/register" element={<RegisterScreen/>}/>
            <Route path="/profile" element={<ProfileScreen/>}/>
            <Route path="/shipping" element={<ShippingScreen/>}/>
            <Route path="/payment" element={<PaymentScreen/>}/>
            <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
            <Route path="/order/:id" element={<OrderScreen/>}/>

            <Route path="/admin/userlist" element={<UserListScreen/>}/>
            <Route path="/admin/user/:id/edit" element={<UserEditScreen/>}/>
            
            <Route path="/admin/paintinglist" element={<PaintingListScreen/>}/>
            <Route path="/admin/painting/:id/edit" element={<PaintingEditScreen/>}/>

            <Route path="/admin/orderlist" element={<OrderListScreen />} />
          </Routes>
        </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
