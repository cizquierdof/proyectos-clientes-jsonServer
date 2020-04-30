import React, { Component } from 'react'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'
import axios from 'axios'
import config from '../config/config'
import { Link } from 'react-router-dom'

export class ProjectView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {}
        }
    }


    componentDidMount() {
        console.log(this.props.match)
        axios.get(`${config.BASE_API_URL}/projects/${this.props.match.params.id}/`)
            .then(res =>
                this.setState({
                    project: res.data
                })
            )
    }

    render() {
        return (
            <div className="project-view">
                <Header>
                    <i aria-hidden="true" className="list icon"></i>
                    Proyecto
                </Header>
                <ProjectCard item={this.state.project}></ProjectCard>
                <Link to="/projects" className="ui button">Volver</Link>

            </div>
        )
    }
}

export default ProjectView
