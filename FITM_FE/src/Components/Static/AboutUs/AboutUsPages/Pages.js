import React from 'react';
import "./Pages.css";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
const Pages =({Name, Avatar, fbLink}) =>{
    const MemberName = Name;
    const FbLink =fbLink;
    const avatar = Avatar;
    const navigate = useNavigate();
    function backToHome() {
        navigate("/");
      }
    return(
        <div className='page-containter' >
            <div className='page-main-contain'> 
                <div className='slogan-contain'>
                    <h5>FIT Team </h5>
                    <hr className='page-line' style={{float:"right"}}></hr>
                    <div style={{marginTop:"20%"}}>
                        <div className='page-title'>
                                <h4>----  Hello ----</h4>
                        </div>
                        <div className='page-Name'>
                            <h2>I'm <h1 style={{color:"red"}}>{MemberName}</h1>, Nice to meet you</h2>
                        </div>
                        <div className='Description' style={{marginLeft:"25%", width:"70%"}}>
                            <h4>..........................................................................</h4>
                        </div>
                    </div>
                </div>
                <div className='page-avatar'>
                    <hr className='page-line'></hr>
                    <h5 style={{float:"right", marginRight:"10%" , marginTop:"-20px"}}> FIT CLUB</h5>
                    <h5 style={{float:"right", marginRight:"10%" , marginTop:"-22px"}}> FPT University</h5>                   
                    <div className='img' style={{backgroundImage:avatar}}></div>
                </div>
            </div>
            <div className='page-contact'>
            <Link href={FbLink}  target="_blank"><ion-icon name="logo-facebook" size="large" style={{color: "blue", marginRight: "20px"}}> </ion-icon></Link>
            <ion-icon name="logo-github" size="large" style={{color:"black"}}></ion-icon>
            </div>
            <Button className='page-back-button' onClick={backToHome}>
                Back
            </Button>
        </div>
    )
};
export default Pages;