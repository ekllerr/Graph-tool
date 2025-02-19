import {Node} from "./Node.js";

export class Graph{
    constructor(){
        this.nodes = [];
        this.edges = [];
        this.selectedNode = null;
        this.tempEdge = null;
    }

    addNode(x,y){
        let number = this.nodes.length > 0 ? this.nodes[this.nodes.length - 1].number + 1 : 1;
        let label = this.getNodeLabel(number -1);
        let newNode = new Node(x, y, number, label);
        newNode.draw();
        this.nodes.push(newNode);
    }


    getNodeLabel(index){
        let label = "";

        while(index >= 0){
            label = String.fromCharCode(65 + (index % 26)) + label;
            index = Math.floor(index / 26) -1;
        }

        return label;
    }
}