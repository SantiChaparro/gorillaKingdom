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
                        <a>Inicio</a>
                    </li>
                    <li>
                        <a>Actividades</a>
                    </li>
                    <li>
                        <a>Sedes</a>
                    </li>
                    <li>
                        <a>Contacto</a>
                    </li>
                    <li>
                        <a>Sobre Nosotros</a>
                    </li>
                </ul>
                <button>Entrar</button>
            </div>
        </div>
    )
}
export default NavBar;
