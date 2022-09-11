import React ,{useContext, useState} from "react";
import  axios from "axios";
import './Products-service.css';
import './BlogForm.css';
import { Navbar } from "./Navbar";
export const  AddProducts =(props)=> {
    const [Name , setName ] = useState();
    const [Price , setPrice ] = useState();
    const [Description , setDescription ] = useState();
    const [ ProductImage , setProductImage ] = useState();
    const [Availabilty , setavailability]= useState();

                const send=(event)=>{
                    const data = new FormData();
                    data.append("Name" , Name);
                    data.append("Price" , Price);
                    data.append("testImage" , ProductImage);
                    data.append("Description" , Description);
                    data.append("Availabilty" , Availabilty);
                    event.preventDefault();
                   axios.post("http://localhost:4001/products/add" , data).then(res=>
                   console.log(res)).catch(err=> console.log(err));
                   event.preventDefault();
                }

            return(

                    <div className="form1-container">
                        <form className="form-main" >
                            <div className="head">
                                <h1>PRODUCT</h1>
                            </div>
                            <div className="i_p">
                                    Item Name: 
                                    <input type="text" id="Name"  name="Name" placeholder="name" 
                                    onChange={ event => {
                                    const {value} = event.target;
                                    setName(value) ;}}></input>
                            </div>
                            <div className="i_p">
                                     Item Price:
                                    <input type="text" id="Price" name="Price"placeholder="price" 
                                     onChange={ event => {
                                        const {value} = event.target;
                                        setPrice(value);}}></input>
                            </div>
                              <div className="i_p">
                                    Item Image: 
                                    <input type="file" id="itemimage" name="itemimage"placeholder="image"   onChange={ event => {
                                        const file = event.target.files[0];
                                        setProductImage(file);}}></input>
                            </div>
                            <div className="i_p">
                                    Item Description: 
                                    <input type="text" id="Description" name="Description"placeholder="description" onChange={ event => {
                                        const {value} = event.target;
                                        setDescription(value);}} ></input>
                            </div>
                            <div className="i_p">
                                    Availabilty: 
                                    <input type="text" id="availabilty" name="Availabity"placeholder="Availability" onChange={ event => {
                                        const {value} = event.target;
                                        setavailability(value)}} ></input>
                            </div>
                            <input type="submit" value="Submit"className="submit fm" onClick={send}></input>
                         
                        </form>
                    </div>
              
            );
    
}
export const  AddServices =(props)=> {
    const [TypeOfService, settype ] = useState();
    const [Cost , setcost ] = useState();
    const [Servicedescription , setDescription ] = useState();
    const [ serviceImage , setservice ] = useState();
    const [Availabilty , setavailability]= useState();

                const send=(event)=>{
                    const data = new FormData();
                    data.append("TypeOfService" , TypeOfService);
                    data.append("Cost" , Cost);
                    data.append("Servicedescription" , Servicedescription);
                    data.append("testImage" , serviceImage);
                    data.append("Availabilty" , Availabilty);
                    event.preventDefault();
                   axios.post("http://localhost:4001/services/add" , data).then(res=>
                   console.log(res)).catch(err=> console.log(err));
                   event.preventDefault();
                }

            return(
                <div  className="main">
                    <div className="form2-container">
                        
                        <form className="form-main" >
                        <div className="head">
                                <h1>SERVICES</h1>
                            </div>
                            <div className="i_p">
                                    Service Type: 
                                    <input type="text" id="Name"  name="Name" placeholder="name" 
                                    onChange={ event => {
                                    const {value} = event.target;
                                   settype(value) ;}}></input>
                            </div>
                            <div className="i_p">
                                     Charges: 
                                    <input type="text" id="Price" name="Price"placeholder="price" 
                                     onChange={ event => {
                                        const {value} = event.target;
                                        setcost(value);}}></input>
                            </div>
                              <div className="i_p">
                                    Image:
                                    <input type="file" id="itemimage" name="itemimage"placeholder="image"   onChange={ event => {
                                        const file = event.target.files[0];
                                        setservice(file);}}></input>
                            </div>
                            <div className="i_p">
                                    Service Description: 
                                    <input type="text" id="Description" name="Description"placeholder="description" onChange={ event => {
                                        const {value} = event.target;
                                        setDescription(value);}} ></input>
                            </div>
                            <div className="i_p">
                                    Availabilty: 
                                    <input type="text" id="availabilty" name="Availabity"placeholder="Availability" onChange={ event => {
                                        const {value} = event.target;
                                        setavailability(value)}} ></input>
                            </div>
                            <input type="submit" value="Submit"className="submit fm" onClick={send}></input>
                         
                        </form>
                    </div>
                </div>
            );
    
}
export const FormsAll = (props)=>{
    return(
        <div className="Allforms">
            <div className="
            navs">
                <Navbar/>
            </div>
        <div className="forms">
        <AddProducts/>
        <AddServices/>
       </div>
       </div>
    );
   
}

