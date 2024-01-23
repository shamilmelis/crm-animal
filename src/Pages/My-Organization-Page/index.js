import React from 'react'
import '../My-Organization-Page/index.scss'
import '../My-Organization-Page/media.scss'
import NavMenu from "../../Components/NavMenu";
import {Link} from "react-router-dom";
const MyOrganizationPage = () => {
    return (
        <div className={'wrapper'} id={'wrapper'}>
            <div className={'wrapper_empty'}></div>
            <NavMenu></NavMenu>
            <div className={'wrapper_content'}>
                <main>
                    <section className={'orgs_section'}>
                        <div className={'orgs_container'}>
                            <div className={'orgs_box'}>
                                <h1 className={'orgs_title'}>Организации</h1>
                                <div className={'orgs_row'}>
                                    <div className={'col'}>
                                        <div className={'box'}>
                                            <Link to={'/myorgs/v-teplye-ryki'} className={'route_link'}></Link>
                                            <span className={'organization_name'}>Проект: "В теплые руки"</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default MyOrganizationPage