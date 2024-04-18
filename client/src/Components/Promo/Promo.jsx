import React from "react";
import style from "./Promo.module.css"
import flecha from "../../assests/arrow.png"
import cross from "../../assests/actividad_cross.png"
import musc from "../../assests/actividad_musc.png"
import body from "../../assests/actividad_body.png"
import aero from "../../assests/actividad_aero.png"
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
            <div className={style.actividades}>
             <p>ACTIVIDADES</p>
             <div className={style.iconActividades}>
              <div>
                <img src={musc} alt="" />
                <p>MUSCULACION</p>
              </div>
              <div>
                <img src={aero} alt="" />
                <p>AEROFITNESS</p>
              </div>
              <div>
                <img src={body} alt="" />
                <p>BODY</p>
              </div>
              <div>
                <img src={cross}alt="" />
                <p>CROSSFIT</p>
              </div>
        
             </div>
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