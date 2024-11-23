import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase"; // Import the Firestore instance
import moment from "moment";

export function useTodos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        console.log('Effect called');
        const unsubscribe = onSnapshot(
            collection(db, "todos"), // Reference the "todos" collection directly
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log('subscribed');
                setTodos(data);
            }
        );

        return () => unsubscribe();
    }, []); // Empty dependency array ensures this effect runs once on mount

    return todos;
}

export function useFilterTodos(todos, selectedProject) {
    const [filteredTodos, setFilteredTodos] = useState([]);

    useEffect(() => {
        let data;

        const todayDateFormated = moment().format('MM/DD/YYYY');
        if (selectedProject === "today") {
            data = todos.filter(todo => {
                const todoDate = moment(todo.date, 'MM/DD/YYYY').startOf('day'); // Normalize todo date
                const today = moment().startOf('day'); // Normalize today's date
                const isToday = todoDate.isSame(today, 'day'); // Compare normalized dates
                return isToday;
            });
        }else if (selectedProject === "next 7 days") {
            data = todos.filter( todo => {
                const todoDate = moment(todo.date, 'MM/DD/YYYY');
                const todayDate = moment(todayDateFormated, 'MM/DD/YYYY');
                const diffDays = todoDate.diff(todayDate, 'days');
                return diffDays >= 0 && diffDays < 7;
            });
        }else if (selectedProject === "all days") {
            data = todos;
        }else {
            data = todos.filter( todo => todo.projectName === selectedProject);
        }
        setFilteredTodos(data);

    }, [todos, selectedProject]);

    return filteredTodos
}

export function useProjects() {
    const [projects, setProjects] = useState([]);

    

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "projects"), // Reference the "projects" collection directly
            (snapshot) => {
                const data = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        name: doc.data().name
                    };
                });
                setProjects(data);
            }
        );

        return () => unsubscribe();
    }, []); // Dependency on `todos` ensures updates when todos change

    return projects;
}

export function useProjectsWithStats(projects, todos){
    const [projectsWithStats, setProjectsWithStats] = useState([])

    useEffect(() => {
        const data = projects.map((project) => {
            return {
                numOfTodos : todos.filter( todo => todo.projectName === project.name && !todo.checked).length,
                ...project
            }
        })

        setProjectsWithStats(data)
    }, [projects, todos])

    return projectsWithStats
}