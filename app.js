import {setUpEventListeners} from "./utils/domUtils.js";
import {Graph} from "./graph/Graph.js";
import {Node} from "./graph/Node.js";

export const canvas = document.getElementById("canvas");
// const canvasRect = canvas.getBoundingClientRect();
export const ctx = canvas.getContext("2d");
export const identifierInput = document.getElementById("nodeIdentifier");

const width = 500;
const height = 500;

canvas.width = width;
canvas.height = height;


export const nodeRadius = 10;

export const graph = new Graph();

setUpEventListeners(canvas);

    const fromNode = new Node(140,180,1,"A");
    fromNode.draw();
    const toNode = new Node(300,250,2,"B");
    toNode.draw();
    graph.nodes.push(fromNode,toNode);
    graph.addEdge(toNode, fromNode);
    console.log(`Added edge from: ${toNode.label} to: ${fromNode.label}`)
    /*graph.addEdge(fromNode, toNode);
    graph.addEdge(fromNode, toNode);
    graph.addEdge(fromNode, toNode);*/
    /*graph.addEdge(toNode, fromNode);
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


    const fromNode2 = new Node(200,300, 3, "C");
    const toNode2 = new Node(400,350, 4, "D");

    fromNode2.draw();
    toNode2.draw();

    graph.nodes.push(fromNode2,toNode2);

    graph.addEdge(fromNode2,toNode2);
    graph.addEdge(fromNode2,toNode2);
    graph.addEdge(fromNode2,toNode2);
    graph.addEdge(fromNode2,toNode2);
    graph.addEdge(fromNode2,toNode2);
    graph.addEdge(fromNode2,toNode2);
    graph.addEdge(fromNode2,toNode2);
    graph.addEdge(fromNode2,toNode2);
    graph.addEdge(fromNode2,toNode2);
    graph.addEdge(fromNode2,toNode2);
    graph.addEdge(fromNode2,toNode2);
    graph.addEdge(fromNode2,toNode2);
    graph.addEdge(fromNode2,toNode2);

    const fromNode3 = new Node(197, 222, 5, "E");
    const toNode3 = new Node(318, 244, 6, "F");
    fromNode3.draw();
    toNode3.draw();
    graph.nodes.push(fromNode3, toNode3);

    graph.addEdge(fromNode3,toNode3);
    graph.addEdge(toNode3, fromNode3);
    graph.addEdge(toNode3, fromNode3);
    graph.addEdge(fromNode3,toNode3);
    graph.addEdge(fromNode3,toNode3);
    graph.addEdge(fromNode3,toNode3);
    graph.addEdge(toNode3, fromNode3);
    graph.addEdge(fromNode3,toNode3);
    graph.addEdge(fromNode3,toNode3);
    graph.addEdge(fromNode3,toNode3);
    graph.addEdge(fromNode3,toNode3);
    graph.addEdge(toNode3, fromNode3);
    graph.addEdge(fromNode3,toNode3);
    graph.addEdge(fromNode3,toNode3);
    graph.addEdge(toNode3, fromNode3);
    graph.addEdge(toNode3, fromNode3);
    graph.addEdge(toNode3, fromNode3);
    graph.addEdge(toNode3, fromNode3);
    graph.addEdge(toNode3, fromNode3);
    graph.addEdge(fromNode3,toNode3);
*/