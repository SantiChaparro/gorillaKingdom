import React from "react";
import style from "./NavBar.module.css"
import icon_gorilla from "../../assests/icon_gorilla.png"


const NavBar =()=>{
    return (
        <div className={style.navbar}>
            <div className={style.logo}>
              <img src={icon_gorilla}></img>
              <p>GORILLA</p>
              <p>Kingdown</p>
            </div>
            <div className={style.contentMenu}>
                <ul className={style.menu}>
                    <li>
                        <a href="#" className={style.link}>Inicio</a>
                    </li>
                    <li>
                        <a href="#" className={style.link}>Actividades</a>
                    </li>
                    <li>
                        <a href="#" className={style.link}>Sedes</a>
                    </li>
                    <li>
                        <a href="#" className={style.link}>Contacto</a>
                    </li>
                    <li>
                        <a href="#" className={style.link}>Sobre Nosotros</a>
                    </li>
                </ul>
                <button>Entrar</button>
            </div>
        </div>
    )
}
export default NavBar;
