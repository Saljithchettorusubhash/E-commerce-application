import Header from "./componenets/layout/Header"
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

import './index.css';
import Home from "./pages/Home";
import Footer from "./componenets/layout/Footer";



function App() {

  return (
    <Router>

    <div className="App">
      <Header/>
        <Routes>
        <Route path="/" element={<Home/>} />
        </Routes>
        <Footer/>
     
    </div>
    </Router>

  )
}

export default App
