import React from 'react'
import '../Announcement-Page/index.scss'
import '../Announcement-Page/media.scss'
import NavMenu from "../../Components/NavMenu";
import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import NoImage from '../../Images/image_not_available.png'
const AnnouncementPage = () => {
    // Код который получает данные
    const {id} = useParams()
    const [getAnnoun, setGetAnnoun] = useState([])
    const [getImg, setGetImg] = useState('')
    const [modal, setModal] = useState(false)
    const [selectActive, setSelectActive] = useState(0)
    // useEffect который получает данные изображений
    useEffect(() => {
        axios.get(`https://65a6516774cf4207b4efbc00.mockapi.io/dogs/${id}`)
            .then(res => {
                setGetAnnoun(res.data)
                setGetImg(res.data ? res.data.image.map(el => el).slice(0,1) : '')
            })
    }, [])

    // Функция которая получает img и его index при нажатии на фото-карточки
    const takeSrc = (e, index) => {
        setGetImg(e)
        setSelectActive(index)
    }
    useEffect(() => {
    }, [getImg])

    // Функция которая открывает и закрывает модалку "Контакты"
    const openModal = () => {
        setModal(true)
        document.body.style.overflow = "hidden"
    }
    const closeModal = () => {
        document.body.style.overflow = "visible"
        setModal(false)
    }

    // Верстка
    return (
        <div className={modal === false ? 'wrapper' : 'wrapper scrollOff'} id={'wrapper'}>
            <div className={'wrapper_empty'}></div>
            <NavMenu></NavMenu>
            <div className={'wrapper_content'}>
                <main>
                    <section className={'announ_section'}>
                        <div className={'announ_container'}>
                            <div className={'announ_box'}>
                                <div className={'previous_page_box'}>
                                    <Link to={'/myorgs/v-teplye-ryki'} className={'previous_page_btn'}>В теплые руки</Link>
                                    <span>/</span>
                                    <span>обьявления</span>
                                    <span>/</span>
                                    <span>{getAnnoun.id}</span>
                                </div>
                                <div className={'announ_row'}>
                                    <div className={'col col-order-2'}>
                                        <div className={'box box_inform'}>
                                            <h1 className={'announ_title'}>{getAnnoun.title ? getAnnoun.title : getAnnoun.title}</h1>
                                            <div className={'box_inform_inner'}>
                                                <span className={'announ_type'}>Тип: <span className={'announ_type_value'}>{getAnnoun.type ? getAnnoun.type : getAnnoun.type}</span></span>
                                                <span className={'announ_descr'}>Описание:</span>
                                                <p className={'announ_description'}>{getAnnoun.descr ? getAnnoun.descr : getAnnoun.descr}</p>
                                            </div>
                                            <div className={'box_contacts_inner'}>
                                                <button className={'call_btn'} onClick={() => openModal()}><i className="fa-solid fa-phone"></i>Контакты</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'col col-order-1'}>
                                        <div className="box box-image">
                                                <div className={'box_image_corusel'}>
                                                    <img src={getAnnoun.image ? getAnnoun.image.length === 0 ? NoImage : getImg : getImg} alt="pic" className={'announ_image'}/>
                                                </div>
                                            <div className={'box_image_pics'}>
                                                {
                                                    getImg ? getAnnoun.image.map((el, index) => {
                                                        return (
                                                            <img src={el} alt="pic" className={selectActive === index ? 'pic_index Active' : 'pic_index'} onClick={(e) => takeSrc(e.target.src, index)}/>
                                                        )
                                                    }) : <img src={NoImage} alt="pic" className={'pic_index'}/>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className={modal === false ? 'modal_contacts' : 'modal_contacts Opened'}>
                        <div className={'modal_contacts_box'}>
                            <button className={'close_modal_btn'} onClick={() => closeModal()}><i className="fa-solid fa-xmark"></i></button>
                            <div className={'modal_contacts_info'}>
                                <img src="https://img5.lalafo.com/i/avatar/d9/62/1f/91e8fa1ee1dbe7afa73aeae841.jpeg" alt="" className={'author_avatar'}/>
                                <span className={'author_name'}>{getAnnoun.author_name}</span>
                                <a href={`tel:${getAnnoun.author_phoneNumber}`}  className={'author_phoneNumber'}>{getAnnoun.author_phoneNumber}</a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AnnouncementPage