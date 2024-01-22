import React from 'react'
import '../Organiz-Info/index.scss'
import '../Organiz-Info/media.scss'
import NavMenu from "../../Components/NavMenu";
import axios from "axios";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
const OrganizInfo = () => {
    const [open, setOpen] = useState(false)
    const [accept, setAccept] = useState('')
    const [getAnnoun, setGetAnnoun] = useState([])
    const [title, setTitle] = useState('')
    const [descr, setDescr] = useState('')
    const [img, setImg] = useState('')
    const [author, setAuthor] = useState('')
    const [authorPhone, setAuthorPhone] = useState('')
    const [type, setType] = useState('')

    const getAnn = () => {
        axios.get('https://65a6516774cf4207b4efbc00.mockapi.io/dogs')
            .then(res => {
                if (res) {
                    setGetAnnoun(res.data)
                }
            })
    }

    useEffect(() => {
        axios.get('https://65a6516774cf4207b4efbc00.mockapi.io/dogs')
            .then(res => {
                setGetAnnoun(res.data)
            })
    }, [])

    const openModal = () => {
        setOpen(true)
        document.body.style.overflow = "hidden"
    }
    const closeModal = () => {
        document.body.style.overflow = "visible"
        setOpen(false)
        setTitle('')
        setDescr('')
        setAuthor('')
        setAuthorPhone('')
    }

    const createAnnoun = () => {
        if (title) {
            if (descr) {
                if (img) {
                    if (author) {
                        if (authorPhone) {
                            if (type) {
                                closeModal()
                                axios.post(`https://65a6516774cf4207b4efbc00.mockapi.io/dogs`, {
                                    "title": `${title}`,
                                    "descr": `${descr}`,
                                    "image": [`${img}`],
                                    "author_name": `${author}`,
                                    "author_phoneNumber": `${authorPhone}`,
                                    "type": `${type}`
                                })
                                    .then(res => {
                                        console.log(res.data)
                                    })
                                    .catch(err => console.log(err))
                                setTimeout(() => {getAnn()}, 500)
                            } else {
                                alert('Напишите тип')
                            }
                        } else {
                            alert('Напишите ваш номер!')
                        }
                    } else {
                        alert('Напишите Имя!')
                    }
                } else {
                    alert('Добавьте 1-2 фотографии!')
                }
            } else {
                alert('Описание не может быть пустым!')
            }
        } else {
            alert('Название не может быть пустым!')
        }
    }

    return (
        <div className={'wrapper'} id={'wrapper'}>
            <div className={'wrapper_empty'}></div>
            <NavMenu></NavMenu>
            <div className={'wrapper_content'}>
                <main>
                    <section className={'info_section'}>
                        <div className={'info_container'}>
                            <div className={'info_box'}>
                                <div className={'create_box'}>
                                    <span className={'create_title'}>Создать обьявление</span>
                                    <button className={'create_announ_button'} onClick={() => openModal()}><i className="fa-solid fa-pen"></i>Создать</button>
                                </div>
                                <div className={'info_row'}>
                                    {
                                        getAnnoun.map(el => {
                                            return (
                                                <div className={'col'} key={el.id}>
                                                    <div className={'box'}>
                                                        <Link to={`/myorgs/v-teplye-ryki/announcement/${el.id}`} className={'route_link'}></Link>
                                                        <img src={el.image ? el.image.map(el => el).slice(0, 1) : ''} alt="" className={'box_image'}/>
                                                        <h1 className={'box_title'}>{el.title.length > 45 ? el.descr.substring(0, 45) + '...' : el.title}</h1>
                                                        <p className={'box_descr'}>{el.descr.length > 80 ? el.descr.substring(0, 80) + '...' : el.descr}</p>
                                                        <button className={'button_look'}><i className="fa-solid fa-eye"></i>Посмотреть</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className={open === false ? 'create_modal' : 'create_modal Opened'}>
                        <div className={'create_modal_box'}>
                            <div className={'modal_actions'}>
                                <h1 className={'modal_title'}>Публикация</h1>
                                <button className={'modal_close_btn'} onClick={() => closeModal()}><i className="fa-solid fa-xmark"></i></button>
                            </div>
                            <div className={'modal_inputs'}>
                                <span className={'modal_head'}>Название</span>
                                <input className={'modal_head_inp'} onChange={(e) => setTitle(e.target.value)}/>
                                <span className={'modal_descr'}>Описание</span>
                                <textArea class={'modal_descr_textarea'} onChange={(e) => setDescr(e.target.value)}/>
                                <span className={'modal_author'}>Имя владельца</span>
                                <input className={'modal_author_inp'} type="text" defaultValue={author} onChange={(e) => setAuthor(e.target.value)}/>
                                <span className={'modal_phoneNum'}>Номер владельца</span>
                                <input className={'modal_phoneNum_inp'} type="text" defaultValue={authorPhone} onChange={(e) => setAuthorPhone(e.target.value)}/>
                                <span className={'modal_image'}>Ссылка на изображение (бета):</span>
                                <input className={'modal_img_inp'} type="text" defaultValue={img} onChange={(e) => setImg(e.target.value)}/>
                                <span className={'modal_type'}>Тип</span>
                                <input className={'modal_type_inp'} type="text" defaultValue={type} onChange={(e) => setType(e.target.value)}/>
                                <button onClick={() => setAccept(img)}>Загрузить</button>
                                {accept === '' ? '' : <img src={accept} alt="" className={'modal_img'}/>}
                            </div>
                            <div className={'modal_accept_create'}>
                                <button className={'create_button'} onClick={() => createAnnoun()}>Создать</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default OrganizInfo