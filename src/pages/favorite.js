import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import { MdOutlineFavoriteBorder, MdFavorite, AiOutlinePlus, AiOutlineClose,BsBasket} from "react-icons/all"
import Header from "../components/header"
import ProductContext from '../context/productContext';
import Basket from './basket';
import Modal from "react-modal"

function Favorite() {
  const [products, setProducts] = useState([]);
  const [productsFavorite, setProductsFavorite] = useState([]);
  const [basket, setBasket] = useState([]);
  const {setnewProduct} = useContext(ProductContext);
  const [modalIsOpen,setModalIsOpen] = useState(false);

  const getProducts = async () => {
    await fetch('https://fakestoreapi.com/products')
      .then((res) => {
        return res.json()
      }).then(data => {
        setProducts(data);
      })
  }

  useEffect(async () => {
    await getProducts();
  }, [])

  useEffect(() => {
    getFavorites();
  }, [products]);

  useEffect(()=>{
    setnewProduct(basket);
    console.log(basket);
  },[basket]);



  const getFavorites = async () => {
    await fetch('http://localhost:3001/app')
      .then((res) => {
        return res.json();
      }).then(data => {
        const favorites = data.result;
        const newProducts = products.map(product => {
          const newData = favorites.find(favorite => favorite.id === product.id);//favorileri burada ekliyor
          // console.log(f);
          product.isFavorite = newData?.isFavorite || false;
          
          return product;
        });      
        setProductsFavorite(newProducts);
      })
  }

  const removeFavorite = (item) => {
    axios.delete(`http://localhost:3001/app/${item.id}`)
      .then((result) => {
        const newProductsFavorite = productsFavorite.map(productFavorite => {
          if (productFavorite.id === item.id) {
            productFavorite.isFavorite = false;
          }
          return productFavorite;
        });
        setProductsFavorite(newProductsFavorite);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openModal = () => {
    setModalIsOpen(true);
}

const closeModal = () => {
    setModalIsOpen(false);
}

const customStyles = {
    content :{
    top : "50%",
    left: '50%',
    right: 'auto',     
    bottom: 'auto',
    marginRight: '-50%',
    border :"none",

    transform: 'translate(-50%, -50%)',
    }
}


  return (
    <>
      <Header></Header>
      <BsBasket className="BsBasket"onClick={openModal}></BsBasket>
            { <Modal
                isOpen={modalIsOpen}
                contentLabel="Hello"
                onRequestClose={closeModal}
                style={customStyles}
                > 
                
                <div>
                <AiOutlineClose onClick={closeModal} className="close"></AiOutlineClose>
                </div>
                
                <Basket></Basket>
            </Modal> }
      <div className="product">
        {
          productsFavorite.map((item, key) => {
            if (item.isFavorite === true) {
              return <li className="card" key={key} >
                <img className="image" src={item.image} ></img>
                <label className="title">{item.title}</label>
                <label className="price">{item.price}$</label>
                <button className="favorite" onClick={() => removeFavorite(item)}>
                  {
                    !item.isFavorite ? <MdOutlineFavoriteBorder></MdOutlineFavoriteBorder> : <MdFavorite></MdFavorite>
                  }
                </button>
                <button className="favorite" onClick={() => {

                  setBasket(data => data.concat(item));                  
                }}>
                  <AiOutlinePlus></AiOutlinePlus>
                </button>
                
              </li>
            }
          })
        }
      </div>
    </>
  )
}

export default Favorite
