import React from 'react'
import '../Organiz-Info/index.scss'
import '../Organiz-Info/media.scss'
import NavMenu from "../../Components/NavMenu";
import axios from "axios";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import NoImage from '../../Images/image_not_available.png'
const OrganizInfo = () => {
    // Код который получает данные и выводит на главную страницу
    const [open, setOpen] = useState(false)
    const [accept, setAccept] = useState('')
    const [announce, setAnnounce] = useState([])
    const [title, setTitle] = useState('')
    const [descr, setDescr] = useState('')
    const [img, setImg] = useState('')
    const [author, setAuthor] = useState('')
    const [authorPhone, setAuthorPhone] = useState('')
    const [type, setType] = useState('')
    // Код который запускает функцию "изменить,удалить блок"
    const [setting, setSetting] = useState(false)
    const [selectStg, setSelectStg] = useState(0)
    // Код который получает данные при нажатии и открывает модалку Edit
    const [editDecl, setEditDecl] = useState()
    const [editModal, setEditModal] = useState(false)
    // Код который меняет данные
    const [editImage, setEditImage] = useState([])
    const [editTitle, setEditTitle] = useState('')
    const [editDescr, setEditDescr] = useState('')
    const [editAuthor, setEditAuthor] = useState('')
    const [editPhone, setEditPhone] = useState('')
    const [editType, setEditType] = useState('')
    const [isId, setIsId] = useState(0)
    // Код который запускает функицю "изменить, добавить, удалить изображение"
    const [changePhoto, setChangePhoto] = useState(false)
    const [changeIndex, setChangeIndex] = useState(0)
    const [getLink ,setGetLink] = useState('')
    const [addImage, setAddImage] = useState(false)
    const [addLink, setAddLink] = useState('')
    const [getId, setGetId] = useState(0)
    // Функция которая выдает данные с axios (mockapi)
    const getAnn = () => {
        axios.get('https://65a6516774cf4207b4efbc00.mockapi.io/dogs')
            .then(res => {
                    setAnnounce(res.data)
            })
    }
    useEffect(() => {
        axios.get('https://65a6516774cf4207b4efbc00.mockapi.io/dogs')
            .then(res => {
                setAnnounce(res.data)
            })
    }, [])

    // Функция которая получает данные при наведении на блок
    const editModalFunc = (el) => {
        axios.get(`https://65a6516774cf4207b4efbc00.mockapi.io/dogs/${el}`)
            .then(resp => {
                if (resp) {
                    setEditDecl(resp.data)
                }
            })
    }
    // Функция которая получает данные блока и отрисовывает в модалке
    const editModalGetFunc = () => {
        setEditModal(true)
        setSetting(false)
        setTimeout(() => {
            setEditImage(editDecl.image.map(el => el))
            setEditTitle(editDecl.title)
            setEditDescr(editDecl.descr)
            setEditAuthor(editDecl.author_name)
            setEditPhone(editDecl.author_phoneNumber)
            setEditType(editDecl.type)
            setIsId(editDecl.id)
        }, 1000)
        document.body.style.overflow = "hidden"
    }
    useEffect(() => {

    }, [editDecl, getLink, editImage])
    // Функция которая сохраняет изменения и отправляет в axios (mockapi)
    const saveModalFunc = () => {
        axios.put(`https://65a6516774cf4207b4efbc00.mockapi.io/dogs/${isId}`, {
            title: editTitle,
            descr: editDescr,
            image: editImage === '' ? [] : editImage.map(el => el),
            author_name: editAuthor,
            author_phoneNumber: editPhone,
            type: editType
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        setTimeout(() => {
            getAnn()
        }, 500)
        setEditModal(false)
        document.body.style.overflow = "visible"
    }

    // Функция которая открывает модалку для добавления обьявления
    const openModal = () => {
        setOpen(true)
        document.body.style.overflow = "hidden"
    }

    // Функция которая закрывает модалку для добавления обьявления
    const closeModal = () => {
        document.body.style.overflow = "visible"
        setOpen(false)
        setTitle('')
        setDescr('')
        setAuthor('')
        setAuthorPhone('')
    }
    useEffect(() => {

    }, [img, setting, selectStg])

    // Функция которая находится внутри модалки, и при нажатии на "Create" создает обьявление
    const createAnnounce = () => {
        if (title) {
            if (descr) {
                    if (author) {
                        if (authorPhone) {
                            if (type) {
                                closeModal()
                                axios.post(`https://65a6516774cf4207b4efbc00.mockapi.io/dogs`, {
                                    "title": `${title}`,
                                    "descr": `${descr}`,
                                    "image": img === '' ? [] : [`${img}`],
                                    "author_name": `${author}`,
                                    "author_phoneNumber": `${authorPhone}`,
                                    "type": `${type}`
                                })
                                    .then(res => {
                                        console.log(res.data)
                                    })
                                    .catch(err => console.log(err))
                                setTimeout(() => {
                                    getAnn()
                                }, 500)
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
                alert('Описание не может быть пустым!')
            }
        } else {
            alert('Название не может быть пустым!')
        }
    }

    // Функия которая запускает режим "изменить,удалить блок"
    const functionSettings = (el) => {
        setSetting(!setting)
        setSelectStg(el)
    }

    // Функция которая удаляет выбранный блок
    const deleteFunction = (id) => {
        axios.delete(`https://65a6516774cf4207b4efbc00.mockapi.io/dogs/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setTimeout(() => {
            getAnn()
        }, 500)
        setSetting(false)
    }

    // Функция которая удаляет или меняет изображение в модалке Edit
    const changeImage = (id,index) => {
        setChangePhoto(true)
        setChangeIndex(index)
    }
    useEffect(() => {

    }, [changeIndex])
    // Верстка
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
                                        announce.map(el => {
                                            return (
                                                <div className={'col'} key={el.id} onClick={() => {
                                                    editModalFunc(el.id)
                                                }} onMouseLeave={() => {
                                                    setEditDecl(null)
                                                }}>
                                                    <div className={'box'}>
                                                        <div className={'box_route'}>
                                                            <Link to={`/myorgs/v-teplye-ryki/announcement/${el.id}`}
                                                                  className={'route_link'}></Link>
                                                            <img
                                                                src={el.image.length === 0 ? NoImage : el.image.map(el => el).slice(0, 1)}
                                                                alt="" className={'box_image'}/>
                                                            <h1 className={'box_title'}>{el.title.length > 45 ? el.descr.substring(0, 45) + '...' : el.title}</h1>
                                                            <p className={'box_descr'}>{el.descr.length > 80 ? el.descr.substring(0, 80) + '...' : el.descr}</p>
                                                        </div>
                                                        <div className={'box_actions'}>
                                                            <Link to={`/myorgs/v-teplye-ryki/announcement/${el.id}`} className={'button_look'}>
                                                                <i className="fa-solid fa-eye"></i>
                                                                Посмотреть
                                                            </Link>
                                                            <div className={'box_edit'}>
                                                                <button className={'edit_btn'} onClick={() => functionSettings(el.id)}>
                                                                    <i className="fa-solid fa-ellipsis"></i>
                                                                </button>
                                                                <div
                                                                    className={setting === false ? 'box_edit_inner' : (el.id === selectStg ? 'box_edit_inner Opened' : 'box_edit_inner')}>
                                                                    <button className={'editEl_btn'} onClick={() => editModalGetFunc()}>
                                                                        <i className="fa-solid fa-pencil"></i>
                                                                    </button>
                                                                    <button className={'deleteEl_btn'} onClick={() => deleteFunction(el.id)}>
                                                                        <i className="fa-solid fa-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }).reverse()
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
                                <textarea className={'modal_descr_textarea'}
                                          onChange={(e) => setDescr(e.target.value)}/>
                                <span className={'modal_author'}>Имя владельца</span>
                                <input className={'modal_author_inp'} type="text" defaultValue={author}
                                       onChange={(e) => setAuthor(e.target.value)}/>
                                <span className={'modal_phoneNum'}>Номер владельца</span>
                                <input className={'modal_phoneNum_inp'} type="text" defaultValue={authorPhone}
                                       onChange={(e) => setAuthorPhone(e.target.value)}/>
                                <span className={'modal_image'}>Ссылка на изображение (бета):</span>
                                <div className={'modal_upload_image_box'}>
                                    <div className={'modal_upload_image_inner'}>
                                        <input className={'modal_img_inp'} type="text" defaultValue={img}
                                               onChange={(e) => setImg(e.target.value)}/>
                                    </div>
                                </div>
                                <span className={'modal_type'}>Тип</span>
                                <input className={'modal_type_inp'} type="text" defaultValue={type}
                                       onChange={(e) => setType(e.target.value)}/>
                                <button onClick={() => setAccept(img)}>Загрузить</button>
                                {accept === '' ? '' : <img src={accept} alt="" className={'modal_img'}/>}
                            </div>
                            <div className={'modal_accept_create'}>
                                <button className={'create_button'} onClick={() => createAnnounce()}>Создать</button>
                            </div>
                        </div>
                    </div>
                    <div className={editModal === false ? 'modal_edit' : 'modal_edit Opened'}>
                        <div className={'modal_edit_box'}>
                            <div className={'modal_edit_images'}>
                                {
                                    editImage ? editImage.map((el, index) => {
                                        return (
                                            <div className={'modal_edit_image_inner'}>
                                                <div className={'modal_edit_actions'}>
                                                    <button className={'change_image_btn'} onClick={() => changeImage(el,index)}><i className="fa-solid fa-pen"></i></button>
                                                    <button className={'delete_image_btn'} onClick={() => setEditImage(editImage.filter((elem, idx) => idx !== index))}><i className="fa-solid fa-trash"></i></button>
                                                </div>
                                                <img key={el} src={el} alt="image" className={'modal_image'}/>
                                                <div className={changePhoto === false ? 'small_modal_images' : (changePhoto === true && index === changeIndex ? 'small_modal_images Active' : 'small_modal_images')}>
                                                    <div className={'small_modal_images_box'}>
                                                        <div className={'box_link'}>
                                                            <input type="text" placeholder={'Введите ссылку'} defaultValue={getLink || el} onChange={(e) => setGetLink(e.target.value)}/>
                                                        </div>
                                                        <div className="box_actions">
                                                            <button className={'save_btn'} onClick={() => {
                                                                if (getLink) {
                                                                    setEditImage(editImage.map((el, idx) => idx === index ? getLink : el))
                                                                    setChangePhoto(false)
                                                                } else {
                                                                    setChangePhoto(true)
                                                                }
                                                            }}><i className="fa-solid fa-check"></i></button>
                                                            <button className={'cancel_btn'} onClick={() => setChangePhoto(false)}><i className="fa-solid fa-xmark"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : ''
                                }
                            </div>
                            <div className={'modal_edit_add_image'}>
                                <div className={'modal_edit_add_box'}>
                                    <button className={'add_image_btn'} onClick={() => setAddImage(true)}>Добавить фотографию</button>
                                    <div className={addImage === false ? 'add_image_box_inner' : 'add_image_box_inner Active'}>
                                        <input type="text" placeholder={'Введите ссылку'} defaultValue={addLink} onChange={(e) => setAddLink(e.target.value)}/>
                                        <button onClick={() => {
                                            editImage.push(addLink)
                                            setTimeout(() => {
                                                setAddLink('')
                                            }, 500)
                                            setAddImage(false)
                                        }}><i className="fa-solid fa-check"></i></button>
                                        <button onClick={() => {
                                            setTimeout(() => {
                                                setAddLink('')
                                            }, 500)
                                            setAddImage(false)
                                        }}><i className="fa-solid fa-xmark"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className={'modal_edit_sections'}>
                                <div className={'col'}>
                                    <div className={'box'}>
                                        <span className={'section_name'}>Title</span>
                                        <input type="text" className={'section_input'} defaultValue={editTitle}
                                               onChange={(e) => setEditTitle(e.target.value)}/>
                                    </div>
                                </div>
                                <div className={'col'}>
                                    <div className={'box'}>
                                        <span className={'section_name'}>Author</span>
                                        <input type="text" className={'section_input'} defaultValue={editAuthor}
                                               onChange={(e) => setEditAuthor(e.target.value)}/>
                                    </div>
                                </div>
                                <div className={'col'}>
                                    <div className={'box'}>
                                        <span className={'section_name'}>Phone</span>
                                        <input type="text" className={'section_input'} defaultValue={editPhone}
                                               onChange={(e) => setEditPhone(e.target.value)}/>
                                    </div>
                                </div>
                                <div className={'col'}>
                                    <div className={'box'}>
                                        <span className={'section_name'}>Type</span>
                                        <input type="text" className={'section_input'} defaultValue={editType}
                                               onChange={(e) => setEditType(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className={'modal_edit_descr'}>
                                <span className={'descr_title'}>Description</span>
                                <textarea className={'textarea_descr'} defaultValue={editDescr}
                                          onChange={(e) => setEditDescr(e.target.value)}></textarea>
                            </div>
                            <div className={'modal_edit_actions'}>
                                <button className={'save_btn'} onClick={() => saveModalFunc()}>Save</button>
                                <button className={'cancel_btn'} onClick={() => {
                                    setEditModal(false)
                                    setSetting(false)
                                    document.body.style.overflow = "visible"
                                }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default OrganizInfo