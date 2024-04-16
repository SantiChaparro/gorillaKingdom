import React from "react";
import style from "./Hero.module.css"
import banner from "../../assests/banner1.png"
import pesa from "../../assests/pesa8.png"
import flecha from "../../assests/arrow.png"
import adidas from "../../assests/adidas_icon.png"
import pp from "../../assests/pay.png"
import spotify from "../../assests/spotify.png"
import power from "../../assests/powerade.png"




const Hero =()=>{
    return(
        <div className={style.container}>
           
            <div className={style.heroLeft}>
                <p>Trabaja día a día para sacar lo mejor de ti!</p>
             </div>
             <div className={style.adidas}>
             <p>Entrenamiento profesional</p>
             <img src={adidas} alt="" />
             <img src= {pp}alt="" />
             <img src={spotify} alt="" />
             <img src={power} className={style.powerade} alt="" />
             </div>
            <div className={style.btn}>
                <img src={pesa} alt="" />
                <div>Planes 2024</div>
                <img src={flecha} alt="" />
            </div>
            <div className={style.heroRight}>
                <img src={banner} alt="" />
            </div>
           
        </div>
    )
}
export default Hero;