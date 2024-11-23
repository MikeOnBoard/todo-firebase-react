import React, { useState } from "react";
import { Plus } from "react-bootstrap-icons";
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import db from "../firebase";

function AddNewProject() {
    const [showModal, setShowModal] = useState(false);
    const [projectName, setProjectName] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
    
        if (projectName) {
            const projectsRef = collection(db, "projects");
    
            try {
                // Query Firestore to check if the project name exists
                const q = query(projectsRef, where("name", "==", projectName));
                const querySnapshot = await getDocs(q);
    
                if (querySnapshot.empty) {
                    // Add the project if it does not exist
                    await addDoc(projectsRef, {
                        name: projectName,
                    });
                    alert("Project added successfully");
                } else {
                    alert("Project name already exists");
                }
            } catch (error) {
                console.error("Error adding project: ", error);
            }
    
            // Reset modal and input state
            setShowModal(false);
            setProjectName("");
        }
    }
    return (
        <div className='AddNewProject'>
            <div className="add-button">
                <span onClick={() => setShowModal(true)}>
                    <Plus size="20"/>
                </span>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <ProjectForm
                    handleSubmit={handleSubmit}
                    heading="Add New Project"
                    value={projectName}
                    setValue={setProjectName}
                    setShowModal={setShowModal}
                    confirmButtonText={"Add Project"}
                />
            </Modal>
        </div>
    )
}

export default AddNewProject;