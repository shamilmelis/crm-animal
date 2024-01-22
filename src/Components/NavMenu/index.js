import React from 'react'
import '../NavMenu/index.scss'
import '../NavMenu/media.scss'
import {Link} from "react-router-dom";
import {useState} from "react";
const NavMenu = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className={open === false ? 'nav_bar' : 'nav_bar Opened'}>
            <div className={'nav_box'}>
                <div className={'nav_logo'}>
                    <h1 className={'nav_title'}>crm animal</h1>
                    <div className={'nav_burger'}>
                        <button className={'burger_btn'} onClick={() => setOpen(!open)}>
                            <i className="fi fi-rr-align-left"></i>
                        </button>
                    </div>
                </div>
                <div className={'nav_routes'}>
                    <h1></h1>
                    <div className={'route'}>
                        <Link to={'/'} className={'route_link'}></Link>
                        <i className="fi fi-rr-apps"></i>
                        <span className={'route_name'}>Мои организации</span>
                    </div>
                    <div className={'route'}>
                        <Link to={'/tasks'} className={'route_link'}></Link>
                        <i className="fi fi-rr-comment-alt"></i>
                        <span className={'route_name'}>Задания</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavMenu