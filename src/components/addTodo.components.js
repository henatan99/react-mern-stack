import React, { Component } from 'react';
import axios from 'axios';

export default class AddTodoComponent extends Component {
    constructor(props) {
        super(props)
        this.onTaskChange = this.onTaskChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            task: ''
        }
    }

    refreshPage() {
        window.location.reload(false);
    }

    onTaskChange(e) {
        this.setState({
            task: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const todoObject = {
            task: this.state.task
        }
        axios.post('http://localhost:5050/api/create-todo', todoObject)
            .then((res) => {
                console.log(res.data)
            })
        this.setState({ task: '' })
        this.refreshPage()
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}