import React, { useContext, useState } from "react";
import "./ProductList.css";
import ServiceContext from "../store/ServiceContext";
import { Navbar } from "./Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../store/CartContext";
import Loading from "./Loading";

export function Services(props) {
  const [load, setLoad] = useState(0);
  const ServiceCtx = useContext(ServiceContext);
  const Cartctx = useContext(CartContext);
  useEffect(() => {
    getServices();
  }, []);
  const getServices = async () => {
    const data = await fetch("http://localhost:4001/services");
    const items_data = await data.json();
    if (items_data) {
      setLoad(1);
    }
    ServiceCtx.setservices(items_data.products);
  };

  const buynowhandler = (event) => {
    const CartOBject = {
      Name: event.target.parentNode.querySelector(".Name").innerText,
      quantity: 1,
      Price: event.target.parentNode.querySelector(".Price").querySelector("a")
        .innerText,
    };
    let cartItem = [...Cartctx.cartItem];
    console.log(cartItem);
    cartItem = cartItem.filter(
      (cartitem) =>
        cartitem.Name ===
        event.target.parentNode.querySelector(".Name").innerText
    );
    if (cartItem.length > 0) {
      cartItem[0].quantity = cartItem[0].quantity + 1;
    } else {
      Cartctx.setcartitems([...Cartctx.cartItem, CartOBject]);
    }
  };

  const navigate = useNavigate();
  if (!load) {
    return <Loading />;
  } else {
    return (
      <div className="list">
        <div className="navs">
          <Navbar />
        </div>
        <h1>Services</h1>
        <button id="add" onClick={() => navigate("/add")}>
          + ADD SERVICES
        </button>
        <div className="service_list">
          <div className="services">
            {ServiceCtx.services.map((singleData, index) => {
              const base64String = btoa(
                String.fromCharCode(
                  ...new Uint8Array(singleData.serviceImage.data.data)
                )
              );

              return (
                <div className="item-container" key={index}>
                  <div className="Name">
                    <h3>{singleData.TypeOfService}</h3>
                  </div>
                  <img
                    src={`data:image/png;base64,${base64String}`}
                    width="300"
                    className="IMAGE"
                  ></img>

                  <div className="Description">
                    <h3>{singleData.Servicedescription}</h3>{" "}
                  </div>
                  <div className="Price">
                    <h3>
                      ₹<a>{singleData.Cost}</a>
                    </h3>
                  </div>
                  <button className="buyNow" onClick={buynowhandler}>
                    AVAIL NOW
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <button id="cart" onClick={() => navigate("/cart")}>
          <img
            className="icon"
            src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=170667a&w=0&h=kEh5VLsTHukWc7xf2BvUs8ssqS_d7vkK0-xU3MDpO7s="
          ></img>
          <div id="btn">
            <h2>{Cartctx.cartItem.length}</h2>
          </div>
        </button>
      </div>
    );
  }
}
