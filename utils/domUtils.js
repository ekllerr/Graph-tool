import {graph} from "../app.js";
import {findClickedNode} from "./helpers.js";

export function setUpEventListeners(){
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
}

function getClientCoordinates(e){
    const canvasRect = canvas.getBoundingClientRect();
    return [e.clientX - canvasRect.x, e.clientY - canvasRect.y];
}

