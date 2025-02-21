import {Node} from "./Node.js";
import {Edge} from "./Edge.js";
import {clearCanvas} from "../utils/helpers.js";

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

    addEdge(fromNode, toNode){
        let newEdge = new Edge(fromNode, toNode);
        newEdge.draw();
        this.edges.push(newEdge);
        this.resetSelectedNode();
    }

    removeNode(node){
        let index = this.nodes.indexOf(node);

        if(index === -1) return;

        this.nodes.splice(index, 1);

        for(let i = 0; i < this.nodes.length; i++){
            this.nodes[i].number = i + 1;
            this.nodes[i].label = this.getNodeLabel(i);
        }


        for (let i = this.edges.length - 1; i >= 0; i--) {
            if (this.edges[i].fromNode === node || this.edges[i].toNode === node) {
                this.removeEdge(this.edges[i]);
            }
        }

        // this.redrawGraph();
    }

    removeEdge(edge){
        let index = this.edges.indexOf(edge);

        if(index === -1) return;

        this.edges.splice(index, 1);
        // this.redrawGraph();
    }

    redrawAllNodes(){
        for(let node of this.nodes){
            node.draw();
        }
    }

    redrawAllEdges(){
        for(let edge of this.edges){
            edge.draw();
        }
    }

    redrawGraph(){
        clearCanvas();
        this.redrawAllNodes();
        this.redrawAllEdges();
    }


    getNodeLabel(index){
        let label = "";

        while(index >= 0){
            label = String.fromCharCode(65 + (index % 26)) + label;
            index = Math.floor(index / 26) -1;
        }

        return label;
    }

    resetSelectedNode(){
        this.selectedNode = null;
    }
}