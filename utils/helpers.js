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

export function isCursorOnEdge(edge,cursor,threshold=3){
    const {x:Ax, y: Ay} = edge.fromNode;
    const {x:Bx, y: By} = edge.toNode;
    const {x:Cx, y:Cy} = cursor;

    const edgeLength = Math.sqrt((By-Ay)**2 + (Bx-Ax)**2);

    if(edgeLength === 0) return;

    const distance = Math.abs((By-Ay)*Cx - (Bx-Ax)*Cy + Bx*Ay - By*Ax)/edgeLength;

    const dotProduct1 = (Cx - Ax) * (Bx - Ax) + (Cy - Ay) * (By - Ay);
    const dotProduct2 = (Cx - Bx) * (Ax - Bx) + (Cy - By) * (Ay - By);

    return distance < threshold && dotProduct1>=0 && dotProduct2;
}