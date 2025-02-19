import  {graph, nodeRadius, canvas, ctx} from "../app.js";

export function findClickedNode(x, y) {
    for (let i = 0; i < graph.nodes.length; i++) {
        let dx = x - graph.nodes[i].x;
        let dy = y - graph.nodes[i].y;

        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < nodeRadius) {
            return graph.nodes[i];
        }
    }

    return null;
}

export function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}