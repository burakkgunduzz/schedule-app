import { TiDelete } from "react-icons/ti"
import { useContext } from "react"
import { dashboardContextFunc } from "../context/DashboardContext";
import "./CardTodo.css"

const CardTodo = ({ todoText, todoId, cardId }) => {

    const { projects, setProjects } = useContext(dashboardContextFunc);

    const deleteTodoItem = () => {
        const currentProjectsCopy = [...projects];
        const currentCard = currentProjectsCopy.filter((item) => item.id === cardId)[0];
        const updatedTodos = currentCard.todos.filter((item) => item.id !== todoId);
        const withoutCurrentCard = currentProjectsCopy.filter((item) => item.id !== cardId);
        const updatedCard = { ...currentCard, todos: updatedTodos }
        const updatedProject = [...withoutCurrentCard, updatedCard]
        setProjects(updatedProject)
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="page__toggle">
                <label className="toggle">
                    <input className="toggle__input" type="checkbox" />
                    <span className="toggle__label">
                    </span>
                </label>
            </div>
            {todoText}
            <div>
                <TiDelete style={{ cursor: "pointer" }} onClick={deleteTodoItem} size="1.6em"></TiDelete>
            </div>
        </li>
    )
}

export default CardTodo
