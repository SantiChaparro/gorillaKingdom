import React, { useEffect, useState } from "react";
import style from "./NavBar.module.css"
//import icon_gorilla from "../../assests/icon_gorilla.png"
import { useSectionStore } from "../../store/useSectionStore";
import { IconButton, styled, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const handleClick = (setLoggin) => {
    setLoggin(true);
};

const NavBar = ({ setLoggin, loggin , setOpendrawer}) => {
    const { getSections, sections } = useSectionStore();
   

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    console.log(sections);

    const handleMenuClick = () => {
        setOpendrawer(true);
    };

    useEffect(() => {
        getSections();
    }, [getSections])

    return (
        <div className={style.navbar}>
            <div className={style.logo}>
                
                <p>GORILLA</p>
                <p>Kingdown</p>
            </div>
            {isMobile ? (
                <IconButton onClick={handleMenuClick}>
                    <MenuIcon fontSize="large" />
                </IconButton>

            ) : (
                <div className={style.contentMenu}>
                    <ul className={style.menu}>
                        {sections.map(section => (
                            <li key={section.id}>
                                <a href={section.id} className={style.link}>{section.name}</a>
                            </li>
                        ))}
                    </ul>
                    <button className={style.logginButton} onClick={() => { handleClick(setLoggin) }}>Entrar</button>
                </div>
            )}


        </div>
    )
}
export default NavBar;

{/* <li>
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
</li> */}
