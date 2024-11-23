import React, { useState, useContext } from "react";
import ProjectForm from "./ProjectForm";
import { doc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import db from "../firebase";
import { TodoContext } from "../context";

function RenameProject({ project, setShowModal }) {
    const [newProjectName, setNewProjectName] = useState(project.name);

    //context
    const {selectedProject, setSelectedProject} = useContext(TodoContext);
    const renameProject = async (project, newProjectName) => {
        try {
            // Reference to the project document
            const projectsRef = doc(db, "projects", project.id);

            // Create a query to check if a project with the new name already exists
            const projectsQuery = query(
                collection(db, "projects"),
                where("name", "==", newProjectName)
            );

            // Get the result of the query
            const querySnapshot = await getDocs(projectsQuery);
            
            if (!querySnapshot.empty) {
                alert("Project name already exists");
                return; // Exit if project name already exists
            }

            // If project name does not exist, update the project name
            await updateDoc(projectsRef, {
                name: newProjectName,
            });

            console.log(`Project with ID ${project.id} successfully updated.`);

            // Update todos that have the old project name
            const todosQuery = query(
                collection(db, "todos"),
                where("projectName", "==", project.name)
            );
            const todoSnapshot = await getDocs(todosQuery);

            // Update todos associated with the project
            const updatePromises = todoSnapshot.docs.map((todoDoc) =>
                updateDoc(todoDoc.ref, { projectName: newProjectName })
            );
            await Promise.all(updatePromises);

            if (selectedProject === project.name) {
                setSelectedProject(newProjectName);
            }

            console.log(`Todos associated with project ${project.name} updated.`);

        } catch (error) {
            console.error("Error updating project: ", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        renameProject(project, newProjectName);
        
        setShowModal(false); // Close the modal after renaming the project
    };

    return (
        <div className="RenameProject">
            <ProjectForm
                handleSubmit={handleSubmit}
                heading="Edit Project"
                value={newProjectName}
                setValue={setNewProjectName}
                setShowModal={setShowModal}
                confirmButtonText={"Confirm"}
            />
        </div>
    );
}

export default RenameProject;
