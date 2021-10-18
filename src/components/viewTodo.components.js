import React, { Component } from 'react';

import axios from 'axios';

export default class ViewTodoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: []
        }

        this.deleteTodo = this.deleteTodo.bind(this);
    }

    componentDidMount() {
        this.getTodos();
    }

    getTodos() {
        const headers = { 'Content-type': 'application/json'}

        const endpoint = 'http://localhost:5050/api';

        axios.get(endpoint, { headers })
        .then(response => {
            this.setState({
                todos: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteTodo(id) {
        axios.delete('http://localhost:5050/api/delete-todo/' + id)
        .then((res) => {
            alert('Todo deleted!')
            this.getTodos();
        }).catch((error) => {
            console.log(error)
        })
    }
    render() {
        const { todos } = this.state;
        return (
            <>
                <ul className="list-group mt-3">
                    {todos.map((data) => (
                        <li key={data._id} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{data.task}</div>
                            </div>
                            <span className="badge bg-success rounded-pill" onClick={this.openModal}>Update</span>
                            &nbsp;
                            <span className="badge bg-danger rounded-pill" onClick={this.deleteTodo.bind(this, data._id)}>Delete</span>
                        </li>
                    ))}
                </ul>
            </>
        )
    }
}