import React from 'react';
import './navbar.css';

export default class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            insert: "",
            delete: ""
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    handleClick = e => {
        this.props.handleClick(e.target.name, this.state[e.target.name]);
        this.setState({ [e.target.name]: "" });
    }

    render() {
        return (
            <div className="navbar">
                <div className="text">AVL Tree</div>
                <input type="text" name="insert" className="input" onChange={this.handleChange} value={this.state.insert}></input>
                <button className="insert" name="insert" onClick={this.handleClick} >Insert</button>
                <input type="text" className="input" onChange={this.handleChange}></input>
                <button className="delete" name="delete" onClick={this.handleClick} value={this.state.delete}>delete</button>
            </div>
        );
    }
}