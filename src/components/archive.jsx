function Archive({archive}) {
    return (
        <section id="archive-section">
            <h2>Архів виконаних завдань</h2>

            <ul id="task-list">
                {Array.isArray(archive) && archive.map((item, index) => (
                    <li key={index}>
                        <div style={{
                            display: "flex",
                            lineHeight: '1.5em',
                        }}>
                        <span className="status-task-btn" style={{background: "#6200ee54"}}>
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
                            <span className="deleteTask" style={{background: "#01878652"}}>
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

export default Archive;