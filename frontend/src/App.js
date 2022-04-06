import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import PaintingScreen from './screens/PaintingScreen';
import CartScreen from './screens/CartScreen'

function App() {
  return (
    <Router>
      <Header/>
        <main className='py-3'>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>} exact />
            <Route path="/painting/:id" element={<PaintingScreen/>} />
            <Route path="/cart" element={<CartScreen/>} />
            <Route path="/cart/:id" element={<CartScreen/>} />
          </Routes>
        </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
