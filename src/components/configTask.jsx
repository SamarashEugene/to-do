import {useState} from "react";
import ToDoList from './toDoList';
import moment from 'moment';
import Archive from "./archive";

function ConfigTask() {
    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [priority, setPriority] = useState("Низький");
    const [tasksArray, setTasksArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState("none");
    const [searchInput, setSearchInput] = useState('');
    const [archive, setArchive] = useState([]);

    const dateInMonth = moment().add(1, 'month');
    const maxDate = dateInMonth.format('YYYY-MM-DD') + 'T' + dateInMonth.format('HH:mm');
    const filteredByInputSearch = tasksArray.filter(task => task.name.toLowerCase().includes(searchInput.toLowerCase()));

    function showFilter(e) {
        setSearchInput(e.target.value);
    }

    function handleDateTime(e) {
        setTaskDate(e.target.value);
    }

    function handlePriority(e) {
        setPriority(e.target.value);
    }

    function handleInputChange(e) {
        setTaskName(e.target.value);
    }

    const deleteTask = (indexToDelete) => {
        setTasksArray(tasksArray.filter((_, index) => index !== indexToDelete));
    }

    function completeTask(nameToComplete, index) {
        setArchive([...archive, nameToComplete]);

        setTasksArray(tasksArray.filter((_, i) => i !== index));

        console.log('task Completed')
    }

    function handleAdd() {
        const newTask = {
            name: taskName,
            date: taskDate ? moment(taskDate) : null,
            priority: priority,
        }

        if (taskName.trim() === '') {
            setErrorMessage('block');
        }

        if (taskName.trim() !== '') {
            setTasksArray([...tasksArray, newTask]);
            setTaskName("");
            setTaskDate("");
            setErrorMessage('none');
        }
    }

    return (
        <section id="add-task-section">
            <h2>Додати нове завдання</h2>
            <form id="task-form">
                <input type="text" id="task-input"
                       placeholder="Введіть текст завдання"
                       value={taskName}
                       onChange={handleInputChange}
                       maxLength="60"
                       required/>
                <input type="datetime-local"
                       min={moment().format('YYYY-MM-DD') + 'T' + moment().format('HH:mm')}
                       max={maxDate}
                       onChange={handleDateTime}
                       id="task-date"
                       placeholder="Дата та час (необов'язково)"/>
                <select id="priority-selector" onChange={handlePriority}>
                    <option value="Низький">Низький пріоритет</option>
                    <option value="Середній">Середній пріоритет</option>
                    <option value="Високий">Високий пріоритет</option>
                </select>
                <button type="button" onClick={handleAdd}>Додати</button>
            </form>
            <div className="error-message" style={{display: errorMessage}}>Task name is required</div>
            <h2>Список завдань</h2>
            <div id="filters">
                <input type="text" id="search-input" placeholder="Пошук..." value={searchInput} onChange={showFilter}/>
                <select id="filter-category">
                    <option value="all">Усі</option>
                    <option value="completed">Виконані</option>
                    <option value="uncompleted">Невиконані</option>
                </select>
                <select id="sort-options">
                    <option value="date">За датою</option>
                    <option value="priority">За пріоритетом</option>
                </select>
            </div>
            <ToDoList message={filteredByInputSearch} onDelete={deleteTask} onComplete={completeTask}/>
            <Archive archive={archive}/>
        </section>
    )
}

export default ConfigTask;