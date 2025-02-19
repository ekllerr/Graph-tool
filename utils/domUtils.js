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
            console.log(clickedNode);
        }else{
            graph.addNode(x,y);
        }
    });

    canvas.addEventListener("contextmenu", e => {
        e.preventDefault();
        let [x, y] = getClientCoordinates(e);
        let clickedNode = findClickedNode(x,y);
        if(clickedNode){
            console.log(clickedNode);
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

