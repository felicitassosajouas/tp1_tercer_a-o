import React from 'react'
//import logo from '../images/logo.png' (si quiero agregar alguna img)
export const Footer = () => {
    //1º estado, 2º funcionalidad que cambiará el estado
    //const [clicks, setClicks] = useState(0);
    
    const year = new Date().getFullYear();
    const materia = "TP N°1 - PROGRAMACIÓN III - AÑO 2025";

    //HANDLE + EVENTO 
    //const handleClick = () => {
    //    console.log(Evento handleClick);
    //}

    return(
        <div>
            <footer className="mt-auto text-white-50">
            {/* <img className="logo" src={logo} width={"150"} alt="logo" />  */} 
            <p>&copy; {year} {materia}</p>
            </footer>
        </div>
    )
}

export default Footer