import React, { useEffect } from "react";
import { useContext } from "react";
 import { Navbar } from "./Navbar";
 import CartContext from "../store/CartContext";
 import { useState } from "react";
 import "./cart.css";

export function Cart(){
    let [totalAmount , setTotalAmount]= useState(0);

    const Cartctx = useContext(CartContext);
    let cartItem = [...Cartctx.cartItem];
        function remove(event)
        {
            let cartItem = [...Cartctx.cartItem];
             cartItem = Cartctx.cartItem.filter((item)=>{
                return item.Name!=event.target.parentNode.parentNode.querySelector(".name").innerText;})
            Cartctx.setcartitems([...cartItem]);
        

        }
       function inc(event){
                cartItem = Cartctx.cartItem.filter((item)=>{
                    return  item.Name===event.target.parentNode.parentNode.querySelector(".name").innerText;
                })
                if(cartItem[0].quantity >=1)
                {
                
                cartItem[0].quantity+=1;
                Cartctx.setcartitems([...Cartctx.cartItem]);
                }
        }
        function dec(event){
                    cartItem = Cartctx.cartItem.filter((item)=>{
                        return item.Name===event.target.parentNode.parentNode.querySelector(".name").innerText;
                    })
                if(cartItem[0].quantity >=2)
                {
                
                    cartItem[0].quantity -=1;
                    Cartctx.setcartitems([...Cartctx.cartItem]);
                }
                    
        }
        useEffect(() => {
            total();
          })

        function total(){
            let sum =0;
            Cartctx.cartItem.map((item,index)=>{
               
                sum += Number(item.Price)*item.quantity;

            })
            setTotalAmount(sum);
        }
  
  return(
    <div className="carts">
    <div className="nav">
      <Navbar/>
      </div>
      <h1 id="shop">SHOPPING CART</h1>
      <div className="cart">
      {
        Cartctx.cartItem.map((items ,index)=>
        {
           return  <div className="shop">
                <div className="item">
                    <div className="name">{items.Name}</div>
                    <div className="quantity">
                    <button className="fn" id='minus' onClick={dec}>−</button>
                    <input type= 'Number' value={items.quantity}  readOnly></input>
                    <button className="fn" id='plus' onClick={inc} >+</button>
                    <br/>
                    <button className="remove" onClick={remove}>Remove</button>
                    </div>
                    
                    
                    <div className="price">₹ {Number(items.Price)*items.quantity}</div>
                    </div><div className='clear'></div>
                </div>
        })
      }
      <div><h3 id="total">TOTAL AMOUNT: ₹ {totalAmount}</h3></div>
      </div>
      </div>

  )
}