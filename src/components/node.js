import React from 'react';
import './node.css';

const FACTOR = 22;

export default class Node extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            right: null,
            left: null
        };
    }

    render() {
        console.log("I got: ", this.props.node);
        //const margin = ((this.props.node.level + 1)) * SIZE * this.props.node.maxLevel;
        const level = this.props.node.level;
        const maxLevel = this.props.node.maxLevel;
        const amount = Math.pow(2, level);
        const margin = (maxLevel - level + 1) * FACTOR
        const marginTop = 15;
        //style={{ marginLeft: margin, marginRight: margin, marginTop: marginTop }}
        return (
            <div className={this.props.data != null ? "node" : "dummy"} >
                {this.props.data != null ? this.props.data : ""}
                <div className="vl"></div>
            </div>
        );
    }
}