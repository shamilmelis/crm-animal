import React from 'react'
import '../Home-Page/index.scss'
import '../Home-Page/media.scss'
import NavMenu from "../../Components/NavMenu";
const HomePage = () => {
    return (
        <div className={'wrapper'}>
            <div className={'wrapper_empty'}></div>
            <NavMenu></NavMenu>
            <div className={'wrapper_content'}>
                <main>
                    <h1>asd</h1>
                </main>
            </div>
        </div>
    )
}

export default HomePage