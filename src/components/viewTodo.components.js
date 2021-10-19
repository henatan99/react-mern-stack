import React, { Component } from 'react';

import axios from 'axios';
import Modal from 'react-modal';

export default class ViewTodoComponent extends Component {
    
    taskObj = {
        _id: '',
        task: ''
    }

    state = {
        modalIsOpen: false,
        secondModalIsOpen: false
    };

    openModal = (data) => {
        this.setState({
            modalIsOpen: true
        });

        this.setTodoVal(data);
    }

    setTodoVal = (data) => {
        this.taskObj = {
            _id: data._id,
            task: data.task
        }
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    openSecondModal = () => {
        this.setState({ secondModalIsOpen: true} );
    }

    closeSecondModal = () => {
        this.setState({ secondModalIsOpen: false });
    }
    
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