import {Node} from "./Node.js";
import {Edge} from "./Edge.js";
import {clearCanvas} from "../utils/helpers.js";

export class Graph{
    constructor(){
        this.nodes = [];
        this.edges = [];

        this.selectedNode = null;
        this.draggingNode = null;
        this.justDragged = false;
        this.tempEdge = null;
    }

    /* todo
    *   додати можливість створення кратних ребер
    *   додати можливість створити орієнтований граф
    * */

    addNode(x,y,number=null,label=null){
        if(!number){
            number = this.nodes.length > 0 ? this.nodes[this.nodes.length - 1].number + 1 : 1;
        }
        if(!label){
            label = this.getNodeLabel(number -1);
        }
        let newNode = new Node(x, y, number, label);
        newNode.draw();
        this.nodes.push(newNode);
    }

    addEdge(fromNode, toNode){
        let newEdge = new Edge(fromNode, toNode);
        newEdge.draw();
        this.edges.push(newEdge);
        this.clearSelectedNode();

    }

    removeNode(node){
        let index = this.nodes.indexOf(node);

        if(index === -1) return;

        this.nodes.splice(index, 1);

        if(this.selectedNode === node){
            this.clearSelectedNode();
            this.clearTempEdge();
        }

        for(let i = 0; i < this.nodes.length; i++){
            this.nodes[i].number = i + 1;
            this.nodes[i].label = this.getNodeLabel(i);
        }

        for (let i = this.edges.length - 1; i >= 0; i--) {
            if (this.edges[i].fromNode === node || this.edges[i].toNode === node) {
                this.removeEdge(this.edges[i]);
            }
        }

    }

    removeEdge(edge){
        let index = this.edges.indexOf(edge);

        if(index === -1) return;

        this.edges.splice(index, 1);
        // this.redrawGraph();
    }

    redrawNodes(){
        for(let node of this.nodes){
            if(this.draggingNode){
                this.draggingNode.draw('rgba(121,121,121,0.25)');
            }
            if(this.selectedNode===node){
                node.draw('rgba(121,121,121,0.25)');
            } else{
                node.draw();
            }
        }
    }

    redrawEdges(){
        for(let edge of this.edges){
            edge.draw();
        }
    }

    redrawGraph(){
        clearCanvas();
        this.redrawNodes();
        this.redrawEdges();
        if(this.selectedNode && this.tempEdge){
            this.drawTempEdge();
        }
    }

    drawTempEdge(){
        let tempEdge = new Edge(this.selectedNode, this.tempEdge);

        tempEdge.draw();
    }


    getNodeLabel(index){
        let label = "";

        while(index >= 0){
            label = String.fromCharCode(65 + (index % 26)) + label;
            index = Math.floor(index / 26) -1;
        }

        return label;
    }

    saveToJson(){
        const data = {
            nodes: this.nodes.map(node => ({
                number: node.number,
                label: node.label,
                x: node.x,
                y: node.y
            })),
            edges: this.edges.map(edge => ({
                fromNode: edge.fromNode,
                toNode: edge.toNode
            }))
        }

        return JSON.stringify(data, null, 2);
    }

    loadFromJson(json){
        const {nodes,edges} = JSON.parse(json);

        this.clearGraph();

        nodes.forEach(({x,y,number,label}) => {
            this.addNode(x,y,number,label)
        });


        edges.forEach((fromNode, toNode) => {
           const fromIndex = Number(fromNode.number) - 1;
           const toIndex = Number(toNode.number) - 1;

           if(this.nodes[fromIndex] && this.nodes[toIndex]) this.addEdge(this.nodes[fromIndex],this.nodes[toIndex]);
        });

        edges.map(edge => this.addEdge(this.nodes[Number(edge.fromNode.number)-1],this.nodes[Number(edge.toNode.number) - 1]));

        this.redrawGraph();
    }

    clearGraph(){
        this.clearEdges();
        this.clearNodes();
    }

    clearNodes(){
        this.nodes = [];
    }

    clearEdges(){
        this.edges = [];
    }

    clearSelectedNode(){
        this.selectedNode = null;
    }

    clearTempEdge(){
        this.tempEdge = null;
    }

    clearDraggingNode(){
        this.draggingNode = null;
    }
}