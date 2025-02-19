import {graph, canvas, identifierInput} from "../app.js";
import {findClickedNode} from "./helpers.js";

export function setUpEventListeners(){
    setUpCanvasListeners();
    setUpInputsListeners();

}

function setUpCanvasListeners(){
    canvas.addEventListener("click", e => {
        let [x,y] = getClientCoordinates(e);
        let clickedNode = null;
        if(graph.nodes.length > 0){
            clickedNode = findClickedNode(x,y);
        }

        if(clickedNode){
            handleNodeClick(clickedNode);
        }else{
            graph.addNode(x,y);
            graph.resetSelectedNode()
        }
    });

    canvas.addEventListener("contextmenu", e => {
        e.preventDefault();
        let [x, y] = getClientCoordinates(e);
        let clickedNode = findClickedNode(x,y);
        if(clickedNode){
            graph.removeNode(clickedNode);
        }
    });
}

function setUpInputsListeners(){
    identifierInput.addEventListener("input", e => {
        graph.redrawGraph();
    })
}

function getClientCoordinates(e){
    const canvasRect = canvas.getBoundingClientRect();
    return [e.clientX - canvasRect.x, e.clientY - canvasRect.y];
}

function handleNodeClick(clickedNode){
    if(!graph.selectedNode){
        graph.selectedNode = clickedNode;
    } else if(graph.selectedNode !== clickedNode){
        graph.addEdge(graph.selectedNode,clickedNode);
    } else{
        graph.resetSelectedNode()
    }
}
