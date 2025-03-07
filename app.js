import {setUpEventListeners} from "./utils/domUtils.js";
import {Graph} from "./graph/Graph.js";
import {Node} from "./graph/Node.js";
import {Edge} from "./graph/Edge.js";

export const canvas = document.getElementById("canvas");
// const canvasRect = canvas.getBoundingClientRect();
export const ctx = canvas.getContext("2d");
export const identifierInput = document.getElementById("nodeIdentifier");

const width = 500;
const height = 500;

canvas.width = width;
canvas.height = height;


export const nodeRadius = 9;

export const graph = new Graph();

setUpEventListeners(canvas);

/*
const fromNode = new Node(10,10,1,"A");
fromNode.draw();
const toNode = new Node(200,150,2,"B");
toNode.draw();
graph.nodes.push(fromNode,toNode);
graph.addEdge(toNode, fromNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(toNode, fromNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(toNode, fromNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(toNode, fromNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(toNode, fromNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(toNode, fromNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(toNode, fromNode);


let offset = graph.calculateOffset(0);
const edge1 = new Edge(fromNode, toNode, offset);
*/
