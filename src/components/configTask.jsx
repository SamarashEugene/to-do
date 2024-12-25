import {useState} from "react";
import ToDoList from './toDoList';
import moment from 'moment';


// todo save tasks in an external file
// todo dark/light mode



function ConfigTask() {
    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [priority, setPriority] = useState("Низький");
    const [tasksArray, setTasksArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState("none");
    const [searchInput, setSearchInput] = useState('');
    const [archive, setArchive] = useState([]);
    const [filterByStatus, setFilterByStatus] = useState('All');
    const [filterByDatePriority, setFilterByDate] = useState('');

    const dateInMonth = moment().add(1, 'month');
    const maxDate = dateInMonth.format('YYYY-MM-DD') + 'T' + dateInMonth.format('HH:mm');

    const filteredTasks = [...tasksArray, ...archive]
        .filter(task => {
            if (filterByStatus === 'completed') return task.status === 'completed';
            if (filterByStatus === 'uncompleted') return task.status === 'uncompleted';
            return true
        })
        .sort((a, b) => {
            if (filterByDatePriority === 'date') {
                return new Date(a.date) - new Date(b.date)
            }
            if (filterByDatePriority === 'priority') {
                const priorities = {'Низький': 1, 'Середній': 2, 'Високий': 3}
                return priorities[b.priority] - priorities[a.priority];
            }
            return 0
        })
        .filter(task => task.name.toLowerCase().includes(searchInput.toLowerCase()))


    function toFilterByDatePriority(e) {
        setFilterByDate(e.target.value)
    }

    function toFilterByStatus(e) {
        setFilterByStatus(e.target.value);
    }

    function showFilter(e) {
        setSearchInput(e.target.value);
    }

    function handleDateTime(e) {
        setTaskDate(e.target.value);
    }

    function handlePriority(e) {
        setPriority(e.target.value);
    }

    function changeTaskName(e, index) {
        const newName = e.target.value;
        const updatedTasks = tasksArray.map((task, i) => {
            if (i === index) {
                return {...task, name: newName};
            }
            return task;
        })
        setTasksArray(updatedTasks)
    }

    function changeTaskDate(e, index) {
        const newDate = e.target.value;

        const updatedDate = tasksArray.map((task, i) => {
            if (i === index) {
                return {...task, date: newDate}
            }
            return task
        })
        setTasksArray(updatedDate)
    }

    function changePriority(e, index) {
        const newPriority = e.target.value;

        const updatedTasks = tasksArray.map((task, i) => {
            if (i === index) {
                return {...task, priority: newPriority};
            }
            return task;
        })

        setTasksArray(updatedTasks)
    }

    function handleInputChange(e) {
        setTaskName(e.target.value);
    }

    const deleteTask = (indexToDelete) => {
        setTasksArray(tasksArray.filter((_, index) => index !== indexToDelete));
    }

    function completeTask(item, index) {
        const updatedItem = {...item, status: 'completed'};
        setArchive([...archive, updatedItem]);
        setTasksArray(tasksArray.filter((_, i) => i !== index));
    }

    function handleAdd() {
        const newTask = {
            name: taskName,
            date: taskDate ? moment(taskDate) : null,
            priority: priority,
            status: 'uncompleted',
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
                <select onChange={toFilterByStatus}>
                    <option value="all">Усі</option>
                    <option value="completed">Виконані</option>
                    <option value="uncompleted">Невиконані</option>
                </select>
                <select id="sort-options" onChange={toFilterByDatePriority}>
                    <option value="date">За датою</option>
                    <option value="priority">За пріоритетом</option>
                </select>
            </div>


            <ToDoList message={filteredTasks}
                      changePriority={changePriority}
                      onDelete={deleteTask}
                      onComplete={completeTask}
                      onChangeTaskName={changeTaskName}
                      onChangeTaskDate={changeTaskDate}/>

        </section>
    )
}

export default ConfigTask;