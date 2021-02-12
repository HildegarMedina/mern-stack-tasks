import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            _id: "",
            title: "",
            description: "",
            tasks: []
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e) {
        e.preventDefault();
        if (this.state._id) {
            fetch("/api/tasks/" + this.state._id, {
                method: "PUT",
                body: JSON.stringify(this.state),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json()
            .then(data => {
                M.toast({html: "Task updated"});
                this.setState({
                    title: "",
                    description: "",
                    _id: ""
                });
                this.fetchTask();
            }));
        }else {
            fetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json()
            .then(data => {
                M.toast({html: "Task saved"});
                this.fetchTask();
                this.setState({
                    title: "",
                    description: ""
                })
            }))
            .catch(err => console.log(err));
        }
    }

    componentDidMount() {
        this.fetchTask();
    }

    fetchTask() {
        fetch("/api/tasks")
        .then(res => res.json()
        .then(data => {
            this.setState({
                tasks: data
            });
        }))
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name] : value
        });
    }

    deleteTask(id) {
        if (confirm("Are you sure you want to delete it?")) {
            fetch("/api/tasks/" + id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json()
            .then(data => {
                M.toast({html: "Task deleted"});
                this.fetchTask();
            }))
            .catch(err => console.log(err));
        }
    }

    editTask(id) {
        fetch("/api/tasks/" + id)
        .then(res => res.json()
        .then(data => {
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
            console.log(data);
        }))
    }

    render() {
        return (

            <div>

                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a href="/" className="brand-logo">MERN STACK</a>
                    </div>
                </nav>


                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" onChange={this.handleChange} name="title" placeholder="Task Title" value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task Description" className="materialize-textarea" value={this.state.description}/>
                                            </div>
                                        </div>
                                        <button className="btn waves-effect light-blue darken-4" type="submit" name="action">Submit
                                            <i className="material-icons right">send</i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tasks.map(task => {
                                        return (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{margin: "4px"}}>
                                                        <i className="material-icons">edit</i>
                                                    </button>
                                                    <button onClick={() => this.deleteTask(task._id)} className="btn light-blue darken-4" style={{margin: "4px"}}>
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default App;