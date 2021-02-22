import React from 'react';
import NavBar from './components/navbar.js';
import Tree from './components/tree.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    }
  }

  // action can be either insert, delete, find or print
  handleClick = (action, value) => {
    if (action === "insert") {
      const arr = this.state.nodes;
      arr.push(value)
      this.setState({ nodes: arr });
    }
  }

  render() {
    return (
      <div>
        <NavBar handleClick={this.handleClick} />
        <Tree nodes={this.state.nodes} />
      </div>
    );
  }
}
