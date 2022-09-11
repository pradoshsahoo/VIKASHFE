import React, { useState } from 'react'
import ServiceContext from './ServiceContext';

export const ServiceState = (props) => {
    const [services , setservices] = useState([]);
  return (
   <ServiceContext.Provider value={{services , setservices}}>
   {props.children}
   </ServiceContext.Provider>
  );
}
