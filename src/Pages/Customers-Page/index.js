import React, {useState, useEffect} from 'react'
import '../Customers-Page/index.scss'
import '../Customers-Page/media.scss'
import {Link} from 'react-router-dom'
import NavMenu from "../../Components/NavMenu";
import axios from "axios";
const CustomersPage = () => {
    // Код который закрывает/открывает модалку
    const [isModal, setIsModal] = useState(false)
    // Код который получает данные
    const [selectedId, setSelectedId] = useState(0)
    const [anName, setAnName] = useState('')
    const [customers, setCustomers] = useState([])
    // Обьект который получает данные и загружает в модалку
    const [customer, setCustomer] = useState({})
    // Фукнция которая получает данные
    useEffect(() => {
        axios.get(`https://65a6516774cf4207b4efbc00.mockapi.io/customers`)
            .then(res => {
                setCustomers(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {

    }, [selectedId])
    // Функция которая закрывает модалку
    const closeModal = () => {
        setIsModal(false)
    }
    // Фукнция которая передает данные в модалку
    const openModal = () => {
        setIsModal(true)
        axios.get(`https://65a6516774cf4207b4efbc00.mockapi.io/dogs/${selectedId}`)
            .then(res => {
                setAnName(res.data)
            })
            .catch(err => console.log(err))
    }
    const uploadToModal = (id) => {
        axios.get(`https://65a6516774cf4207b4efbc00.mockapi.io/customers/${id}`)
            .then(res => {
                setCustomer(res.data)
            })
            .catch(err => console.log(err))
    }
    // Верстка
    return (
        <div className={'wrapper'}>
            <div className={'wrapper_empty'}></div>
            <NavMenu></NavMenu>
            <div className={'wrapper_content'}>
                <main>
                    <section className={'customers_section'}>
                        <div className={'customers_box'}>
                            <div className={'back_to_page_box'}>
                                <Link to={'/myorgs/v-teplye-ryki'} className={'main_page_title'}>В теплые руки</Link>
                                <span className={'page_title'}>клиенты</span>
                            </div>
                            <div className={'customers_container'}>
                                <div className={'customers_row'}>
                                    {
                                        customers.length > 0 ? customers.map(el => {
                                                return (
                                                    <div className={'col'}
                                                         onMouseEnter={() => {
                                                             setSelectedId(el.selectedId)
                                                         }}>
                                                        <div className="box">
                                                            <div className={'customer_info'}>
                                                                <span className={'customer_avatar'}>{el.customer_name ? el.customer_name.slice(0, 1) : el.customer_name.slice(0,1)}</span>
                                                                <div className={'customer_personal_info'}>
                                                                    <span className={'customer_name'}>{el.customer_name ? el.customer_name : el.customer_name}</span>
                                                                    <span className={'customer_phone'}>| {el.customer_descr ? el.customer_descr : el.customer_descr}</span>
                                                                </div>
                                                            </div>
                                                            <button className={'see-btn'} onClick={() => {
                                                                openModal()
                                                                uploadToModal(el.id)
                                                            }}>Подробнее</button>
                                                        </div>
                                                    </div>
                                                )
                                            }) :
                                            (customers.length === 0 ? 'Пусто.' : customers.map(el => {
                                                return (
                                                    <div className={'col'}
                                                         onMouseEnter={() => {
                                                             setSelectedId(el.selectedId)
                                                         }}>
                                                        <div className="box">
                                                            <div className={'customer_info'}>
                                                                <span className={'customer_avatar'}>{el.customer_name ? el.customer_name.slice(0, 1) : el.customer_name.slice(0,1)}</span>
                                                                <div className={'customer_personal_info'}>
                                                                    <span className={'customer_name'}>{el.customer_name ? el.customer_name : el.customer_name}</span>
                                                                    <span className={'customer_phone'}>| {el.customer_descr ? el.customer_descr : el.customer_descr}</span>
                                                                </div>
                                                            </div>
                                                            <button className={'see-btn'} onClick={() => {
                                                                openModal()
                                                                uploadToModal(el.id)
                                                            }}>Подробнее</button>
                                                        </div>
                                                    </div>
                                                )
                                            }))
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className={isModal === false ? 'customer_modal' : 'customer_modal Active'}>
                        <div className={'customer_modal_box'}>
                            <div className={'modal_actions'}>
                                <button className={'modal_close-btn'} onClick={() => closeModal()}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <div className={'modal_content'}>
                                <span className={'customer_avatar_m'}>{customer.customer_name ? customer.customer_name.slice(0,1) : ''}</span>
                                <div className={'customer_personal_info_m'}>
                                    <span className={'customer_name_m'}>{customer.customer_name ? customer.customer_name : ''}</span>
                                    <span className={'customer_phone_m'}>{customer.customer_phone ? customer.customer_phone : ''}</span>
                                </div>
                                <div className={'customer_appeal'}>
                                    <p className={'appeal_descr'}>{customer.customer_descr ? customer.customer_descr : '123'}</p>
                                    <p className={'appeal_id'}>👇 По поводу 👇</p>
                                    <Link to={`/myorgs/v-teplye-ryki/announcement/${selectedId}`} className={'appeal_route'}>{anName.title ? anName.title.slice(0, 50) + '...' : ''}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CustomersPage