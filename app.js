import {setUpEventListeners} from "./utils/domUtils.js";
import {Graph} from "./graph/Graph.js";
/*import {Node} from "./graph/Node.js";
import {Edge} from "./graph/Edge.js";*/

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

/*const fromNode = new Node(10,10,1,"A");
fromNode.draw();
const toNode = new Node(200,150,2,"B");
toNode.draw();

graph.nodes.push(fromNode,toNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(fromNode, toNode);
graph.addEdge(fromNode, toNode);


let offset = graph.calculateOffset(0);
const edge1 = new Edge(fromNode, toNode, offset);

fromNode.x = 50;
fromNode.y = 200;
toNode.x = 100;
toNode.y = 100;
fromNode.draw();
toNode.draw();

edge1.draw();

offset = graph.calculateOffset(1);

const edge2 = new Edge(fromNode, toNode, offset);
edge2.draw();

offset = graph.calculateOffset(2);

const edge3 = new Edge(fromNode, toNode, offset);
edge3.draw();

offset = graph.calculateOffset(3);

const edge4 = new Edge(fromNode, toNode, offset);
edge4.draw();

offset = graph.calculateOffset(4);

const edge5 = new Edge(fromNode, toNode, offset);
edge5.draw();

offset = graph.calculateOffset(5);

const edge6 = new Edge(fromNode, toNode, offset);
edge6.draw();*/

