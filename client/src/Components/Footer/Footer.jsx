import React from "react";
import style from "./Footer.module.css"
import what from "../../assests/whatsapp_negro.png"
import insta from "../../assests/insta_negro.png"
import face from "../../assests/face_negro.png"
import twitt from "../../assests/twitter.png"
import you from "../../assests/youtube_negro.png"



const Footer=()=>{
    return(
        <div className= {style.conteiner}>
            <div>
                
                <p>Info contacto GORILLA</p>
                <img src={what} alt="" />
                <img src={insta} alt="" />
                <img src={face} alt="" />
                <img src={twitt} alt="" />
                <img src={you} alt="" />

            </div>

            </div>

        
    )
}
export default Footer;
