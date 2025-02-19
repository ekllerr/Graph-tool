const canvas = document.getElementById("canvas");
const canvasRect = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

const identifierInput = document.getElementById("nodeIdentifier");

const width = 500;
const height = 500;

canvas.width = width;
canvas.height = height;

let nodes = [];
let edges = [];

const nodeRadius = 9;

let selectedNode = null;
let tempEdgeEnd = null;

let draggingNode = null;

canvas.addEventListener("click", e => {
    let [x, y] = getClientCoordinates(e);
    handleNodeSelection(x, y);
});

canvas.addEventListener("mousedown", e => {
    let [x, y] = getClientCoordinates(e);
    let clickedNode = findClickedNode(x, y);
    if (clickedNode) {
        if (selectedNode && selectedNode !== clickedNode) {
            handleEdgeCreation(clickedNode);
            selectedNode = null;
            return;
        }
        draggingNode = clickedNode;
        selectedNode = null;
        tempEdgeEnd = null;
    }
});

canvas.addEventListener("mousemove", e => {
    let [x, y] = getClientCoordinates(e);
    if (selectedNode && !draggingNode) {
        tempEdgeEnd = [x, y];
    }
    if (draggingNode) {
        draggingNode.x = x;
        draggingNode.y = y;
        // console.log(selectedNode);
    }
    requestAnimationFrame(redrawAll);
})

canvas.addEventListener("mouseup", () => {
    if (draggingNode) {
        selectedNode = null;
        tempEdgeEnd = null;
    }
    draggingNode = null;
})