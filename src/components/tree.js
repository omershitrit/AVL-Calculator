import './tree.css';
import Node2 from './node.js';

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        data = parseInt(data);
        var newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        }
        else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            }
            else {
                this.insertNode(node.left, newNode);
            }
        }
        else {
            if (node.right === null) {
                node.right = newNode;
            }
            else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(node, key) {

        if (node === null) {
            return null;
        }
        else if (key < node.data) {
            node.left = this.removeNode(node.left, key);
            return node;
        }

        else if (key > node.data) {
            node.right = this.removeNode(node.right, key);
            return node;
        }

        else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            }
            else if (node.right === null) {
                node = node.left;
                return node;
            }
            var aux = this.findMinNode(node.right);
            node.data = aux.data;
            node.right = this.removeNode(node.right, aux.data);
            return node;
        }

    }

    findMinNode(node) {
        if (node.left === null) {
            return node;
        }
        else {
            return this.findMinNode(node.left);
        }
    }

    postorder(node, arr, level) {
        if (node !== null) {
            this.postorder(node.left, arr, level + 1);
            this.postorder(node.right, arr, level + 1);
            arr.push({ data: node.data, left: node.left, right: node.right, level: level });
        }
        return arr;
    }
}

/*
          14
    9            17
2      11    16      19
*/
// 2,9,11,14,16,17,19

const fillLevel = (currentLevel, prevLevel, i, maxLevel) => {
    console.log("currentLevel: ", currentLevel);
    console.log("prevLevel: ", prevLevel);
    let level = [];
    let index = 0;
    prevLevel.forEach(node => {
        if (node.left === null && node.right === null) {
            level.push({ data: null, left: null, right: null, level: i, maxLevel: maxLevel });
            level.push({ data: null, left: null, right: null, level: i, maxLevel: maxLevel });
        } else if (node.left === null) {
            level.push({ data: null, left: null, right: null, level: i, maxLevel: maxLevel });
            level.push(currentLevel[index++]);
        } else if (node.right === null) {
            level.push(currentLevel[index++]);
            level.push({ data: null, left: null, right: null, level: i, maxLevel: maxLevel });
        } else {
            level.push(currentLevel[index++]);
            level.push(currentLevel[index++]);
        }
    });
    return level;
}

const generateArr = (BST, root) => {
    let res = [];
    BST.postorder(root, res, 0);
    let results = [];
    const levels = res.sort((a, b) => (a.level > b.level) ? 1 : ((b.level > a.level) ? -1 : 0))
    const highestLevel = levels.length > 0 ? levels[levels.length - 1].level : 0;
    for (let i = 0; i <= highestLevel; ++i) {
        let temp = [];
        levels.forEach(node => {
            node.maxLevel = highestLevel;
            node.level === i && temp.push(node);
        });
        if (temp.length < Math.pow(2, i) && i > 0) {
            temp = fillLevel(temp, results[i - 1], i);
        }
        results.push(temp);
    }
    console.log("results: ", results);
    return results;
}

const generateAVL = arr => {
    let nodes = JSON.parse(JSON.stringify(arr))
    //const sortedNodes = nodes.sort();
    const BST = new AVLTree();
    nodes.forEach(node => {
        BST.insert(node);
    })
    const root = BST.root;
    const bla = generateArr(BST, root);
    return bla

}

const Tree = props => {
    const levels = generateAVL(props.nodes);
    return (
        <div className="tree">
            {levels.map(level => <div className="level">{level.map((node, index) => <Node2 key={index} data={node !== undefined ? node.data : "XXX"} node={node} />)}</div>)}
        </div>
    );
}



export default Tree;