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

    addNode(x,y){
        let number = this.nodes.length > 0 ? this.nodes[this.nodes.length - 1].number + 1 : 1;

        let label = this.getNodeLabel(number -1);

        let newNode = new Node(x, y, number, label);
        newNode.draw();

        this.nodes.push(newNode);
    }

    addEdge(fromNode, toNode){
        let offset = this.calculateOffset(fromNode, toNode);

        const newEdge = new Edge(fromNode, toNode,offset);
        newEdge.draw();

        this.edges.push(newEdge);

        this.clearSelectedNode();
    }

    calculateOffset(fromNode, toNode, existingEdges){
        const baseOffset = 20;

        if(!existingEdges) existingEdges = this.getEdgesBetweenNodes(fromNode, toNode);


        const edgeCount = existingEdges.length;

        if(edgeCount === 0) return 0;

        const isLastEdgeSameDirection = existingEdges[existingEdges.length - 1].fromNode === fromNode;

        let offset = baseOffset * (edgeCount % 2 === 0 ? 1 : -1) * Math.ceil(edgeCount / 2);

        if(!isLastEdgeSameDirection && offset < 0){
            offset *= -1;
        }
        if(isLastEdgeSameDirection){
            offset *= -1;
        }

        return offset;
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

        const remainingEdges = this.getEdgesBetweenNodes(edge.fromNode, edge.toNode);

        let orderedEdges  = [];
        for(let i = 0; i < remainingEdges.length; i++) {
            remainingEdges[i].offset = this.calculateOffset(remainingEdges[i].fromNode, edge.fromNode,orderedEdges );
            orderedEdges .push(remainingEdges[i]);
        }
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
            if(edge.isDirected !== 'false') edge.drawArrow();
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

    getEdgesBetweenNodes(fromNode, toNode){
        return this.edges.filter(edge =>
            (edge.fromNode === fromNode && edge.toNode === toNode) ||
            (edge.fromNode === toNode && edge.toNode === fromNode)
        );
    }

    getNodeLabel(index){
        let label = "";

        while(index >= 0){
            label = String.fromCharCode(65 + (index % 26)) + label;
            index = Math.floor(index / 26) -1;
        }

        return label;
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