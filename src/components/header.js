import React from "react"
import "../style/header.css"
import { Link } from "react-router-dom";

const Header = ((props)=>{
    return(
     <header>
        <div className="header-content">
            <h1>{props.htext}</h1>
            <div className="header-btns">
                <Link to={props.path2}><button onClick={props.submithandle}>{props.btn2}</button></Link>                    
                <Link to={props.path}><button onClick={props.onClickHandle}>{props.btn}</button></Link>
            </div>
        </div>
       <hr/>
     </header>
    )}
)
export default Header;