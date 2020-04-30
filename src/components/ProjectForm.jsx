import React, { Component } from 'react'
import config from '../config/config'
import Axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export class ProjectForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            code: "",
            description: "",
            client: "",
            redirect: false
        }
    }


    componentDidMount() {
        console.log('proyectCreate match', this.props.id);

        const id = this.props.id;
        //si existe 'id' queremos editar el proyecto y hay que traerse los datos,
        //si id es null no traigo nada 
        if (id) {
            Axios.get(`${config.BASE_API_URL}/projects/${id}/`)
                .then(
                    res => {
                        this.setState({
                            code: res.data.code,
                            description: res.data.description,
                            client: res.data.client
                        })
                    }
                )
                .catch(console.log);
        }
    }

    onClientChange = e => {
        this.setState(
            {
                client: e.target.value
            }
        )
    }

    onDescriptionChange = e => {
        this.setState(
            {
                description: e.target.value
            }
        )
    }

    onCodeChange = e => {
        this.setState(
            {
                code: e.target.value
            }
        )
    }

    //si estamos en modo edición (existe id), hay que hacer un put en vez
    // de un post

    onSubmitClick = e => {
        e.preventDefault();
        const project = {
            code: this.state.code,
            description: this.state.description,
            client: this.state.client
        }
        if (this.props.id) {
            Axios.put(`${config.BASE_API_URL}/projects/${this.props.id}`, project)
                .then(
                    res => this.setState({
                        redirect: true
                    })

                ).catch(console.log)

        } else {
            Axios.post(`${config.BASE_API_URL}/projects`, project)
                .then(
                    res => this.setState({
                        redirect: true
                    })
                ).catch(console.log)
        }
        console.log(project)
    }


    render() {
        return (
            <div className="project-form">
                {/* {this.state.redirect ? <Redirect to="/projects" /> : null} */}
                {this.state.redirect && <Redirect to="/projects" />}
                <form className="ui form" >
                    <div className="field">
                        <label>Ćodigo de proyecto</label>
                        <input type="text" name="code"
                            onChange={this.onCodeChange}
                            value={this.state.code}
                            placeholder="Código de proyecto" />
                    </div>
                    <div className="field">
                        <label>Descripción</label>
                        <input type="text" name="description"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                            placeholder="Descripción" />
                    </div>
                    <div className="field">
                        <label>Cliente</label>
                        <input type="text" name="client"
                            value={this.state.client}
                            onChange={this.onClientChange}
                            placeholder="Cliente" />
                    </div>

                    <Link to="/projects/" className="ui red button">
                        <i className="icon close"></i>
                        Cancelar
                </Link>
                    <button className="ui primary button"
                        onClick={this.onSubmitClick}
                        type="submit">
                        Enviar
                    </button>
                </form>
            </div>
        )
    }
}

export default ProjectForm
