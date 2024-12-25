import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen} from '@fortawesome/free-solid-svg-icons';
import AutoResizeTextarea from './AutoResizeTextarea';


function ToDoList({message, onDelete, onComplete, changePriority, onChangeTaskDate, onChangeTaskName}) {

    const dateInMonth = moment().add(1, 'month');
    const maxDate = dateInMonth.format('YYYY-MM-DD') + 'T' + dateInMonth.format('HH:mm');

    return (
        <section id="task-list-section">
            <ul id="task-list">
                {message.map((item, index) => (
                    <li key={index}>
                        <div style={{
                            color: item.status === 'completed' ? 'rgb(170, 170, 170)' : '#000',
                            display: "flex",
                            justifyContent: "left",
                            width: '100%',
                            lineHeight: '1.5em',
                        }}>
                            <button className="status-task-btn"
                                    style={{
                                        background: item.status === 'completed' ? '#6200ee4a' : '#6200ee',
                                        cursor: item.status === 'completed' ? 'default' : 'pointer'
                                    }}
                                    onClick={() => onComplete(item, index)}
                                    disabled={item.status === 'completed'}>
                                <span></span>
                            </button>
                            <div className="task-name">
                                <FontAwesomeIcon icon={faPen}
                                                 className="edit-task-icon"
                                />
                                <AutoResizeTextarea value={item.name}
                                                    onChange={(e) => onChangeTaskName(e, index)}/>
                            </div>
                        </div>
                        <div className="task-set">
                            <div className="dead-line">
                                <div className='date-time'
                                     style={{fontSize: '1em'}}>{item.date && <span style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    width: '100%',
                                    color: item.status === 'completed' ? 'rgb(170, 170, 170)' : '#000',
                                }}>
                                    {moment(item.date).format('HH:mm DD.MM.YYYY ')}
                                     </span>}
                                    <input type="datetime-local"
                                           style={{
                                               display: item.status === 'completed' ? 'none' : 'block',
                                               border: '2px solid #fff'
                                           }}
                                           min={moment().format('YYYY-MM-DD') + 'T' + moment().format('HH:mm')}
                                           max={maxDate}
                                           value={item.date ? moment(item.date).format('YYYY-MM-DDTHH:mm') : ''}
                                           disabled={item.status === 'completed'}
                                           onChange={(e) => onChangeTaskDate(e, index)}
                                           id="task-date"
                                           placeholder="Дата та час (необов'язково)"/></div>
                            </div>
                            <select className="priority-selector"
                                    value={item.priority}
                                    disabled={item.status === 'completed'}
                                    style={{cursor: item.status === 'completed' ? 'default' : 'pointer'}}
                                    onChange={(e) => changePriority(e, index)}>
                                <option value="Низький">Низький пріоритет</option>
                                <option value="Середній">Середній пріоритет</option>
                                <option value="Високий">Високий пріоритет</option>
                            </select>
                            <button className="deleteTask"
                                    style={{
                                        background: item.status === 'completed' ? '#01878629' : '#018786',
                                        cursor: item.status === 'completed' ? 'default' : 'pointer'
                                    }}
                                    onClick={() => onDelete(index)}>
                                <span className="delete-btn"></span>
                                <span className="delete-btn"></span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ToDoList;