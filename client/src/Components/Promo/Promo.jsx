import React from "react";
import style from "./Promo.module.css"
import flecha from "../../assests/arrow.png"
import gorila from "../../assests/pnggorila.png"


const Promo=()=>{
    return(
    <div className={style.promo}>
       <div className={style.btnContainer}>
         <h1>RESERVA TU CLASE</h1> 
            <div className={style.btn}>
                <div>Turnos online</div>
                <img src={flecha} alt="" />
            </div>
        </div>
          <div className={style.left}>
            <img src={gorila} alt="" />
            <p>Lo mejor de tu interior</p>
          </div>
        </div>

    )
}
export default Promo;