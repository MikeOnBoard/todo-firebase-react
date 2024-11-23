import React, { useState, useContext, useEffect } from "react";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";
import dayjs from "dayjs";
import db from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

function EditTodo() {
    //state
    const [text, setText] = useState("");
    const [day, setDay] = useState(dayjs());
    const [time, setTime] = useState(dayjs());
    const [todoProject, setTodoProject] = useState("");

    //context
    const { selectedTodo, projects} = useContext(TodoContext);
    
    useEffect(() => {
        if (selectedTodo) {
            setText(selectedTodo.text);
            setDay(dayjs(selectedTodo.date, 'MM/DD/YYYY'));
    
            // Use dayjs to parse time
            setTime(dayjs(selectedTodo.time, 'hh:mm A').isValid()
                ? dayjs(selectedTodo.time, 'hh:mm A')
                : dayjs()); // Default to current time if invalid
    
            setTodoProject(selectedTodo.projectName);
        }
    }, [selectedTodo]);
    

    useEffect(() => {
        const updateTodo = async () => {
            if (selectedTodo) {
                try {
                    const todoRef = doc(db, "todos", selectedTodo.id);
                    await updateDoc(todoRef, {
                        text: text,
                        date: day.format("MM/DD/YYYY"),
                        day: dayjs(day).day().toString(),
                        time: time.format("hh:mm A"), // Format time as `hh:mm A`
                        projectName: todoProject,
                    });
                    console.log("Todo updated successfully");
                } catch (error) {
                    console.error("Error updating todo:", error);
                }
            }
        };
        updateTodo();
    }, [text, day, time, todoProject, selectedTodo]);
    


    function HandleSubmit(e) {
        e.preventDefault();
    }
    return (
        <div>
            {
                selectedTodo &&
            <div className='EditTodo'>
                <div className="header">
                    Edit Todo
                </div>
                <div className="container">
                    <TodoForm
                        HandleSubmit={HandleSubmit}
                        text={text}
                        setText={setText}
                        day={day}
                        setDay={setDay}
                        time={time}
                        todoProject={todoProject}
                        setTodoProject={setTodoProject}
                        setTime={setTime}
                        projects={projects}
                    />
                </div>
            </div>
            }
        </div>
    )
}

export default EditTodo;