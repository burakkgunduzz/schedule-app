import { useContext, useState, useEffect } from "react"
import { dashboardContextFunc } from "../context/DashboardContext"
import CardTodo from "./CardTodo";
import { RiDeleteBin6Fill, RiAddCircleFill, RiEditBoxFill } from "react-icons/ri"
import { GiSave } from "react-icons/gi"
import { v4 as uuidv4 } from "uuid"
import "../styles/Card.css"
import { FcDeleteDatabase } from "react-icons/fc"
const Card = ({ cardId }) => {

    const { projects, setProjects } = useContext(dashboardContextFunc);
    const [cardTitle, setCardTitle] = useState("")
    const [todo, setTodo] = useState("")
    const [cardCategory, setCardCategory] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [overlay, setOverlay] = useState(false)

    let currentCard = projects.filter((item) => item.id === cardId)[0]
    let titleOfCard = currentCard.cardTitle;
    let categoryOfCard = currentCard.category;

    useEffect(() => {
        // eslint-disable-next-line
        currentCard = projects.filter((item) => item.id === cardId)[0];
        // eslint-disable-next-line
        titleOfCard = currentCard.cardTitle;
        // eslint-disable-next-line
        categoryOfCard = currentCard.category;
        localStorage.setItem("schedule-app-dashboard", JSON.stringify(projects));
    }, [projects])

    const handleTitle = (e) => {
        setCardTitle(val => e.target.value)
    }

    const handleCategory = (e) => {
        setCardCategory(val => e.target.value)
    }

    const handleSave = () => {
        const currentProjectsCopy = [...projects];
        const withoutCurrentCard = currentProjectsCopy.filter((item) => item.id !== cardId);
        const currentCard = currentProjectsCopy.filter((item) => item.id === cardId)[0];
        const updatedCard = { ...currentCard, cardTitle, category: cardCategory }
        const updatedProject = [...withoutCurrentCard, updatedCard]
        setProjects(val => updatedProject)
        setEditMode(false)
    }

    const onTodoInputChange = (e) => {
        setTodo(val => e.target.value)
    }

    const addTodoItem = (e) => {
        e.preventDefault()
        const currentCardTodosCopy = [...currentCard.todos, { id: uuidv4(), name: todo }]
        const currentCardCopy = { ...currentCard, todos: currentCardTodosCopy }
        const withoutCurrentCard = projects.filter((item) => item.id !== cardId);
        const projectsCopy = [...withoutCurrentCard, currentCardCopy];
        setProjects(val => projectsCopy)
    }

    const deleteCard = () => {
        const currentProjectsCopy = [...projects];
        const lengthOfProjects = currentProjectsCopy.length;
        const withoutCurrentCard = currentProjectsCopy.filter((item) => item.id !== cardId);
        setProjects(val => withoutCurrentCard)
        if (lengthOfProjects === 1) localStorage.removeItem("schedule-app-dashboard")
    }

    const defaultCardStyle = {
        width: "20rem",
        height: "25rem",
    }

    const hoverCardStyle = {
        width: "20rem",
        height: "25rem",
        background: "rgba(0,0,0,0.1)"
    }

    const handleMouseEnter = (e) => {
        setOverlay(true)
    }

    const handleMouseLeave = (e) => {
        setOverlay(false)
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="card m-5" style={overlay ? hoverCardStyle : defaultCardStyle}>
            <div id="card-overlay">
                <p id="card-overlay-text">{overlay ? "EDIT" : ""}</p>
                <div id="card-overlay-icons">
                    {overlay ? <RiEditBoxFill size="2.5em" style={{ cursor: "pointer", width: "6em" }} /> : ""}
                    {overlay ? <FcDeleteDatabase size="3em" style={{ cursor: "pointer", width: "3.5em", paddingRight: "1rem" }} /> : ""}
                </div>
            </div>
            <div className="d-flex justify-content-between">
                {editMode && <GiSave onClick={handleSave} size="1.6em" style={{ cursor: "pointer" }} />}
                {editMode && <RiDeleteBin6Fill onClick={deleteCard} size="1.6em" style={{ cursor: "pointer" }} />}
            </div>
            <div className="card-body">
                <h5 className="card-title text-center gm-effect">{titleOfCard ? titleOfCard : ""}</h5>
                {editMode &&
                    <div className="input-group mb-3">
                        <input onChange={handleTitle} type="text" className="form-control" placeholder="enter a title..." id="project-title" />
                    </div>}
                <h6 className="text-center fw-light mb-3">{categoryOfCard ? categoryOfCard : ""}</h6>
                {editMode &&
                    <div className="input-group mb-3">
                        <input onChange={handleCategory} type="text" className="form-control" placeholder="enter a category..." id="project-category" />
                    </div>}
                {editMode &&
                    <div className="input-group mb-3">
                        <input onChange={onTodoInputChange}
                            type="text" className="form-control" placeholder="add to-do" aria-label="todo-input" aria-describedby="todo-input-area" />
                        <span className="input-group-text" id="todo-input-area">
                            <RiAddCircleFill onClick={addTodoItem} size="1.6em" style={{ cursor: "pointer" }} />
                        </span>
                    </div>}
                {currentCard.todos.map((item) => {
                    return (
                        <CardTodo key={item.id} todoText={item.name} todoId={item.id} cardId={cardId} overlay={overlay} editMode={editMode} />
                    )
                })}
            </div>
        </div>
    )
}

export default Card