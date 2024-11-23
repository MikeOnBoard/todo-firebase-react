import React, { useState, useContext } from "react";
import { Pencil, XCircle } from "react-bootstrap-icons";
import Modal from "./Modal";
import RenameProject from "./RenameProject";
import { TodoContext } from "../context";
import { doc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import db from "../firebase";
import { useTransition, useSpring, animated } from "react-spring";

function Project({project, edit}) {
    //context
    const {defaultProject, selectedProject, setSelectedProject} = useContext(TodoContext);

    //state
    const [showModal, setShowModal] = useState(false);

    //functions
    const deleteProject = async (project) => {
        try {
            // Step 1: Delete the project document
            const projectRef = doc(db, "projects", project.id); // Use project.id, not project.name
            await deleteDoc(projectRef);
    
            console.log(`Project with ID ${project.id} successfully deleted.`);
    
            // Step 2: Query todos that belong to the deleted project
            const todosQuery = query(
                collection(db, "todos"),
                where("projectName", "==", project.name) // Use project.name for filtering
            );
            const querySnapshot = await getDocs(todosQuery);
    
            // Step 3: Delete all the todos associated with the project
            const deletePromises = querySnapshot.docs.map((todoDoc) =>
                deleteDoc(todoDoc.ref)
            );
            await Promise.all(deletePromises);
    
            // Step 4: Update the selected project if it was the deleted one
            if (selectedProject === project.name) {
                setSelectedProject(defaultProject);
            }
    
            console.log(`Todos associated with project ${project.name} successfully deleted.`);
        } catch (error) {
            console.error("Error deleting project or todos:", error);
        }
    };

    //Animations
    const fadeIn = useSpring({
        from: { marginTop: '-120px', opacity: 0 },
        to: { marginTop: '0px', opacity: 1 },
    })

    const buttonsTransition = useTransition(edit, {
        from: { opacity: 0, right : '-20px' },
        enter: { opacity: 1, right : '0px' },
        leave: { opacity: 0, right : '-20px' },
    });

    return (
        <animated.div style={fadeIn} className="Project">
            <div 
                className="name"
                onClick={() => setSelectedProject(project.name)} 
            >
                {project.name}
            </div>
            <div className="buttons">
                {
                    buttonsTransition((props, editProject) =>
                        editProject ? (
                            <animated.div style={props} className="edit-delete">
                            <span onClick={() => setShowModal(true)} className="edit">
                                <Pencil size="13" />
                            </span>
                            <span className="delete" onClick={() => deleteProject(project)}>
                                <XCircle size="13" />
                            </span>
                            </animated.div>
                        ) : project.numOfTodos === 0 ? (
                            ""
                        ) : (
                            <animated.div style={props} className="total-todos">
                            {project.numOfTodos}
                            </animated.div>
                        )
                        )
                }
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <RenameProject project={project}  setShowModal={setShowModal}/>
            </Modal>
        </animated.div>
    )
}

export default Project;