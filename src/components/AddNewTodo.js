import React, { useState, useContext, useEffect } from "react";
import Modal from "./Modal";   
import dayjs from "dayjs";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";
import { calendarItems } from "../constants";
import db from "../firebase";
import moment from "moment";
import randomcolor from "randomcolor";
import { collection, addDoc } from "firebase/firestore";


function AddNewTodo() {
    //context
    const { projects, selectedProject } = useContext(TodoContext);

    //state
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState("");
    const [day, setDay] = useState(dayjs());
    const [time, setTime] = useState(dayjs());
    const [todoProject, setTodoProject] = useState(selectedProject);




    async function HandleSubmit(e) {
        e.preventDefault();
    
        if (text && !calendarItems.includes(todoProject)) {
            try {
                await addDoc(collection(db, "todos"), {
                    text : text,
                    date: day.format('MM/DD/YYYY'),
                    day: dayjs(day).day().toString(),
                    time : moment(time).format('hh:mm A'),
                    checked : false,
                    color : randomcolor({luminosity: 'dark'}),
                    projectName : todoProject
                });
                setShowModal(false);
                setText("");
                setDay(dayjs());
                setTime(dayjs());
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    }
    

    useEffect(() => {
        setTodoProject(selectedProject);
    }, [selectedProject])

    return (
        <div className='AddNewTodo'>
            <div className="button">
            <button onClick={() => setShowModal(true)}>
                + Add New Todo
            </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <TodoForm
                    HandleSubmit={HandleSubmit}
                    heading="Add New Todo"
                    text={text}
                    setText={setText}
                    day={day}
                    setDay={setDay}
                    time={time}
                    setTime={setTime}
                    todoProject={todoProject}
                    setTodoProject={setTodoProject}
                    projects={projects}
                    showButtons={true}
                    setShowModal={setShowModal}
                />
            </Modal>
        </div>
    )
}

export default AddNewTodo;