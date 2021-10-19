import './App.css';
import Home from './pages/home';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Favorite from './pages/favorite';
import ProductContext from './context/productContext';
import Basket from "./pages/basket"
import {useState} from "react"
import {BsInstagram,AiFillGithub} from "react-icons/all"
function App() {
  const [newProduct,setnewProduct] = useState([]);
  return (
    
      <div className="App">
        <ProductContext.Provider value={{newProduct,setnewProduct}}>
        
          <Router>
            <Switch>
              <Route exact path = "/">
              <Home></Home>
              </Route>
              <Route path="/favorite">
                <Favorite></Favorite>
              </Route>
              <Route path="/basket">
                <Basket></Basket>
              </Route>
            </Switch>
          </Router>

          <footer>
            <div className="footer">
              <label>This page created by Mücahit Yüksel for Digitalpals</label>
              <div>
                <AiFillGithub></AiFillGithub>
                <a href="https://github.com/mucahityuksel">Github</a>
              </div>
              <div>
                <BsInstagram></BsInstagram>
                <a href="https://www.instagram.com/mucahittyuksel/?hl=tr">Instagram</a>
              </div>
            </div>
          </footer>
      </ProductContext.Provider>
    </div>
    
  );
}

export default App;
