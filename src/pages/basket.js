import React, { useContext } from 'react'
import ProductContext from '../context/productContext'
import {AiOutlineMinus } from "react-icons/all"


function Basket() {

    const {newProduct,setnewProduct} = useContext(ProductContext);
    
    const removeProduct = (item) => {
        const x = newProduct.filter(data => data.id !== item.id);

        setnewProduct(x);
        
    };
    

  return (
    <>
            
            <ul className="product">
                {
                    newProduct.map((item, key) => {
                        return <li className="card" key={key} >
                            <img className="image" src={item.image} ></img>
                            <label className="title">{item.title}</label>
                            <label className="price">{item.price}$</label>
                            <button className="favorite" onClick={()=>{removeProduct(item);}}>                               
                                <AiOutlineMinus></AiOutlineMinus>
                            </button>
                        </li>
                    })
                }
            </ul>
        </>
  )
}

export default Basket
