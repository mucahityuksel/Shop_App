import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react'
import { MdOutlineFavoriteBorder,MdFavorite,AiOutlinePlus,BsBasket,AiOutlineClose } from "react-icons/all"
import Header from '../components/header';
import Modal from "react-modal"
import ProductContext from '../context/productContext';
import Basket from './basket';
function Home() {
    const [products, setProducts] = useState([]);
    const [productsFavorite, setProductsFavorite] = useState([]);
    const {setnewProduct} = useContext(ProductContext);
    const [basket, setBasket] = useState([]);
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

    useEffect(async () => {
        getFavorites();
    }, [products]);



    const addFavorite = (item) => {
        axios.post(`https://shop-server-deploy.herokuapp.com/app/${item.id}`)
            .then((result) => {
                const newState = result.data;//favoriye eklediklerim
                console.log(newState);
                const newProductsFavorite = productsFavorite.map(productFavorite => {
                    if (productFavorite.id === newState.id) {
                        productFavorite.isFavorite = newState?.isFavorite || false;
                    }
                    return productFavorite;
                });               
                
                setProductsFavorite(newProductsFavorite);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const removeFavorite = (item) => {
        axios.delete(`https://shop-server-deploy.herokuapp.com/app/${item.id}`)
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

    const getFavorites = async () => {
        await fetch('https://shop-server-deploy.herokuapp.com/app')
            .then((res) => {
                return res.json();
            }).then(data => {
                const favorites = data.result;
                //console.log(favorites);
                const newProducts = products.map(product => {
                    const f = favorites.find(favorite => favorite.id === product.id);
                    console.log(f);
                    product.isFavorite = f?.isFavorite || false;//favorileri burada ekliyor
                    
                    return product;
                });
                setProductsFavorite(newProducts);
                //console.log(newProducts);
            })

    }

    useEffect(()=>{
        setnewProduct(basket);
        console.log(basket);
    },[basket]);
    

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
        height: '500px',
        overlfow: "scroll"
        },
        
    }
    return (
        <>
           <Header></Header>
           <BsBasket className="BsBasket" onClick={openModal}></BsBasket>
            { <Modal
                isOpen={!!modalIsOpen}
                contentLabel="Hello"
                onRequestClose={closeModal}
                ariaHideApp={false}
                contentLabel="Selected Option"
                style={customStyles}
                > 
                
                <div>
                <AiOutlineClose onClick={closeModal} className="close"></AiOutlineClose>
                </div>
                
                <Basket></Basket>
            </Modal> }
            <ul className="product">
                {
                    productsFavorite.map((item, key) => {
                        return <li className="card" key={key} >
                            <img className="image" src={item.image} ></img>
                            <label className="title">{item.title}</label>
                            <label className="price">{item.price}$</label>
                            <button className="favorite" onClick={() => {
                                !item.isFavorite ? addFavorite(item) : removeFavorite(item);
                            }}>                               
                                {
                                    !item.isFavorite ? <MdOutlineFavoriteBorder></MdOutlineFavoriteBorder> : <MdFavorite></MdFavorite>
                                }
                            </button>
                            <button className="favorite" onClick={()=> {
                                setBasket(data => data.concat(item));
                            }}>                               
                                <AiOutlinePlus></AiOutlinePlus>
                            </button>
                        </li>
                    })
                }
            </ul>
        </>
    )
}

export default Home
