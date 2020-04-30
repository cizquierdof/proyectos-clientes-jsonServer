import React, {useEffect, useState} from 'react'
import ProjectsTable from '../components/ProjectsTable'
import axios from 'axios'
import { Link } from 'react-router-dom'
import config from '../config/config'
import Header from '../components/Header'

const ProjectList = () => {

    const [projects, setProjects] = useState([]);

    // Hook de efecto
    useEffect(
        () => {
            console.log("componente montado",config.BASE_API_URL);
            axios.get(`${config.BASE_API_URL}/projects`).then(
                res => setProjects(res.data)
            ).catch(
                console.log
            )
            
        }, []
    )

    const deleteElement = (id) => {
        console.log("delete element ",id)
        const nuevosProyectos = projects.filter(
            e => e.id !== id);
        setProjects(nuevosProyectos);
    }
    console.log('ProjectList', projects)
    return (
        <div className="project-list">

                <Header>
                    <i aria-hidden="true" className="list icon"></i>
                    Lista de Proyectos ({projects.length} proyectos)
                </Header>

                <Link to="/projects/new" className="ui basic button">
                    <i className="icon plus"></i>
                        Nuevo Proyecto
                </Link>

                <ProjectsTable deleteElement={deleteElement} items={projects} />
            </div>
    )
}

export default ProjectList
