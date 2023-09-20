import React, { useState } from 'react';
import "./Page.css";
import Header from '../Header/header';


function Page ({isOpen, setOpen}){
    return (
        <div className='Page'> 
            <Header isOpen={isOpen} setOpen={setOpen}></Header>
            
        </div>
    )
}
export default Page;