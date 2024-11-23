import React from "react";
import logo from '../images/todo-logo.jpg';
function AddNewTodo() {
    return (
    <div className="User">
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
        <div className='info'>
            <p>MikeOnBoard</p>
            <a href="https://github.com/MikeOnBoard">Logout</a>
        </div>
    </div>
);
}   

export default AddNewTodo;