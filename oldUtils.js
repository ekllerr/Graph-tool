function getClientCoordinates(e) {
    return [e.clientX - canvasRect.x, e.clientY - canvasRect.y];
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleNodeSelection(x, y) {
    let clickedNode = null;

    if (nodes.length) {
        clickedNode = findClickedNode(x, y);
    }

    if (clickedNode) {
        handleNodeClick(clickedNode);
    } else {
        selectedNode = null;
        handleNodeCreation(x, y);
    }

}

function handleNodeCreation(x, y) {
    let number = nodes.length > 0 ? nodes[nodes.length - 1].number + 1 : 1;
    let label = getNodeLabel(number - 1);
    createNode(x, y, number, label);
}

function createNode(x, y, number, label) {
    let newNode = new Node(x, y, number, label);
    newNode.draw();
    nodes.push(newNode);
}

function getNodeLabel(index) {
    let label = "";
    while (index >= 0) {
        label = String.fromCharCode(65 + (index % 26)) + label;
        index = Math.floor(index / 26) - 1;
    }
    return label;
}

function findClickedNode(x, y) {
    for (let i = 0; i < nodes.length; i++) {
        let dx = x - nodes[i].x;
        let dy = y - nodes[i].y;

        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < nodeRadius) {
            return nodes[i];
        }
    }

    return null;
}

function handleNodeClick(clickedNode) {
    if (!selectedNode) {
        selectedNode = clickedNode;
    } else if (selectedNode !== clickedNode) {
        handleEdgeCreation(clickedNode);
        // console.log(`Edge created from: ${selectedNode.label}, to: ${clickedNode.label}`)
    } else {
        selectedNode = null;
    }
}

function handleEdgeCreation(clickedNode) {
    let newEdge = new Edge([selectedNode.x, selectedNode.y], [clickedNode.x, clickedNode.y], [selectedNode, clickedNode]);
    edges.push(newEdge);
    newEdge.draw();

    selectedNode = null;
    tempEdgeEnd = null;
}

function redrawAllNodes() {
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].draw();
    }
}

function redrawAllEdges() {
    for (let i = 0; i < edges.length; i++) {
        edges[i].draw();
    }
}

function redrawAll() {
    clearCanvas();
    redrawAllNodes();
    redrawAllEdges();
    if (selectedNode && tempEdgeEnd && !draggingNode) {
        ctx.beginPath();
        ctx.moveTo(selectedNode.x, selectedNode.y);
        ctx.lineTo(tempEdgeEnd[0], tempEdgeEnd[1]);
        ctx.stroke();
    }
}