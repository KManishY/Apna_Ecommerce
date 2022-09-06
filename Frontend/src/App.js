import "./App.css";
import { Route, Routes } from 'react-router-dom'
import Checkout from "./Pages/Checkout/Checkout";
import Homepage from "./Pages/Homepage/Homepage";
import LoginSignup from "./Pages/Login_Signup/LoginSignup";
import Products from "./Pages/Product/Products";
import Error from "./Pages/Error";


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route exact path="/login" element={<LoginSignup/>} />
        <Route exact path="/checkout" element={<Checkout/>} />
        <Route exact path="/product" element={<Products/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </>
  )
}

export default App;
