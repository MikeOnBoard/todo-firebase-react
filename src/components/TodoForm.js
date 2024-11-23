import React from "react";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

function TodoForm({
    HandleSubmit,
    heading = false,
    text, setText,
    day, setDay,
    time, setTime,
    todoProject, setTodoProject,
    projects,
    showButtons = false,
    setShowModal = false
}) {
    return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={HandleSubmit} className="TodoForm">
                    <div className="text">
                        {
                            heading &&
                            <h3>{heading}</h3>
                        }
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter Todo..."
                            autoFocus
                        />
                    </div>
                    <div className="remind">
                        <Bell />
                        <p>Remind Me!</p>
                    </div>
                        <div className="pick-day">
                            <div className="title">
                                <CalendarDay />
                                <p>Pick Day</p>
                            </div>
                            <DatePicker
                                value={day}
                                onChange={(selectedDay) => {
                                    if (selectedDay) {
                                        console.log("Selected Day in DatePicker:", selectedDay.format('MM/DD/YYYY')); // Debug
                                        setDay(selectedDay); // Ensure it's correctly updated as a `dayjs` object
                                    } else {
                                        console.error("Invalid date selected");
                                    }
                                }}
                            />
                        </div>
                        <div className="pick-time">
                            <div className="title">
                                <Clock />
                                <p>Pick Time</p>
                            </div>
                            <TimePicker
                                value={time}
                                onChange={(newTime) => {
                                    if (newTime) {
                                        console.log("Selected Time:", newTime.format("hh:mm A")); // Debug
                                        setTime(newTime); // Ensure `time` is updated as a `dayjs` object
                                    } else {
                                        console.error("Invalid time selected");
                                    }
                                }}
                            />
                        </div>
                    <div className="pick-project">
                        <div className="title">
                            <Palette />
                            <p>Pick Project</p>
                        </div>
                        <div className="projects">
                            {
                            projects.length > 0 ?
                            projects.map( project => 
                                <div
                                    className={`project ${todoProject === project.name ? "active" : ""}`}
                                    onClick={() => setTodoProject(project.name)}
                                    key={project.id}
                                >
                                    {project.name}
                                </div>    
                            )
                            :
                            <div style={{color:'#ff0000'}}>
                                Please add a project before proceeding
                            </div>
                            }
                        </div>
                    </div>
                    {
                        showButtons &&
                        <div>
                            <div className="cancel" onClick={() => setShowModal(false)}>
                                <X size="40" />
                            </div>
                            <div className="save">
                                <button >Confirm</button>
                            </div>
                        </div>
                    }
                </form>
                </LocalizationProvider>
    )
}

export default TodoForm;