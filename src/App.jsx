import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import { ItemProvider } from "./context/ItemContext"; // Import ItemProvider correctly
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import BuyPage from "./components/Buypage"
import Cart from "./components/Cart"; // Import LoginPage component
import "./App.css";

const App = () => {
  return (
    <ItemProvider>
      <Router>
        <Routes>
          {/* Define Login and SignUp routes as separate pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Buypage" element={<BuyPage/>}/>

          {/* Main application routes */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <ProductList />
              </>
            }
          />
        </Routes>
      </Router>
    </ItemProvider>
  );
};

export default App;
