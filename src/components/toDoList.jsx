function ToDoList({message, onDelete, onComplete}) {

    return (
        <section id="task-list-section">
            <ul id="task-list">
                {message.map((item, index) => (
                    <li key={index}>
                        <div style={{
                            display: "flex",
                            lineHeight: '1.5em',
                        }}>
                        <span className="status-task-btn" onClick={() => onComplete(item, index)}>
                            <span></span>
                        </span>
                            {item.name}
                        </div>
                        <div className="task-set">
                            <div className="dead-line">
                                <div className='date-time'
                                     style={{fontSize: '1em'}}>{item.date && <span style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    width: '100%'
                                }}>{item.date.format('HH:mm')}</span>}</div>
                                <div className='date'
                                     style={{fontSize: '10px'}}>{item.date && item.date.format('DD.MM.YY')}</div>
                            </div>
                            <div className='priority'>{item.priority}</div>
                            <span className="deleteTask" onClick={() => onDelete(index)}>
                           <span className="delete-btn"></span>
                           <span className="delete-btn"></span>
                        </span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ToDoList;