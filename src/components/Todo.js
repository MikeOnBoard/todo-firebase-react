import React, {useState, useContext} from 'react'
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons'
import { doc , deleteDoc, updateDoc, collection, addDoc } from 'firebase/firestore'
import db from '../firebase'
import moment from 'moment'
import dayjs from 'dayjs'
import { TodoContext } from '../context'
import { useSpring, animated, useTransition } from 'react-spring'

function Todo({todo}){
    //State
    const [hover, setHover] = useState(false)

    //Context
    const {selectedTodo, setSelectedTodo} = useContext(TodoContext)

    //Functions
    const handleDelete = todo => {
        deleteTodo(todo)

        if (selectedTodo === todo) {
            setSelectedTodo(undefined)
    }
    }
    const deleteTodo = async (todo) => {
        try {
            // Create a reference to the document
            const todoRef = doc(db, "todos", todo.id);
    
            // Delete the document
            await deleteDoc(todoRef);
    
            console.log(`Todo with ID ${todo.id} successfully deleted.`);
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const repeatNextDay = async todo => {
        const nextDayDate = moment(todo.date, 'MM/DD/YYYY').add(1, 'days');
    
        const repeatedTodo = {
            ...todo,
            checked: false,
            date: nextDayDate.format('MM/DD/YYYY'),
            day: dayjs(nextDayDate).day().toString(),
        };
    
        // Remove the id field so Firestore can generate a new one
        delete repeatedTodo.id;
    
        try {
            // Add the repeated Todo
            const newTodoRef = await addDoc(collection(db, 'todos'), repeatedTodo);
            console.log('Todo added successfully:', newTodoRef.id);
    
            // Now the new todo has a proper ID, which will be accessible
            repeatedTodo.id = newTodoRef.id;
    
            // Optional: If you need to handle the new todo in the UI immediately, you can update the state or re-fetch the todos here
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };
    
    // Ensure the checkTodo function works with the correct document reference
    const checkTodo = async (todo) => {
        try {
            // Create a reference to the document
            const todoRef = doc(db, "todos", todo.id);
    
            // Update the document
            await updateDoc(todoRef, {
                checked: !todo.checked,
            });
    
            console.log(`Todo with ID ${todo.id} successfully updated.`);
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };
    
    // Animation
    const fadeIn = useSpring({
        from: { marginTop: '-120px', opacity: 0 },
        to: { marginTop: '0px', opacity: 1 },
    })

    const checkTransition = useTransition(todo.checked, {
        from: { position: 'absolute', transform: 'scale(0)' },
        enter: { transform: 'scale(1)' },
        leave: { transform: 'scale(0)' },
    });

    return (
        <animated.div 
            style={fadeIn} 
            className='Todo'
            >
            <div
                className="todo-container"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div 
                    className="check-todo"
                    onClick={() => checkTodo(todo)}
                >
                    {
                        checkTransition((props, checked) =>
                            checked ?
                        <animated.span style={props}className="checked">
                            <CheckCircleFill color="#bebebe" />
                        </animated.span>
                        :
                        <animated.span style={props}className="unchecked">
                            <Circle color={todo.color} />
                        </animated.span>
                        )
                    }
                </div>
                <div 
                    className="text"
                    onClick={() => setSelectedTodo(todo)}
                >
                    <p style={{color : todo.checked ? '#bebebe' : '#000000'}}>{todo.text}</p>
                    <span>{todo.time} - {todo.projectName}</span>
                    <div className={`line ${todo.checked ? 'line-through' : ''}`}></div>
                </div>
                <div 
                    className="add-to-next-day"
                    onClick={() => repeatNextDay(todo)}
                >
                    {
                        todo.checked &&
                        <span>
                            <ArrowClockwise />
                        </span>
                    }
                </div>
                <div 
                    className="delete-todo"
                    onClick={() => handleDelete(todo)}
                >
                    {
                        (hover || todo.checked) &&
                        <span>
                            <Trash />
                        </span>
                    }
                </div>
            </div>
        </animated.div>
    )
}

export default Todo