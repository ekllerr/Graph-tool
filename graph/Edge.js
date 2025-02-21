import {ctx, nodeRadius} from "../app.js";

export class Edge {
    constructor(fromNode, toNode) {
        this.fromNode = fromNode;
        this.toNode = toNode;
    }

    draw() {
        const startPoint = {x: this.fromNode.x, y: this.fromNode.y};
        const endPoint = {x: this.toNode.x, y: this.toNode.y};
        const [start, end] = this.calculateEdgeEndpoints(startPoint, endPoint);

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }

    calculateEdgeEndpoints(startPoint, endPoint){
        const {x: Ax, y: Ay} = startPoint;
        const {x: Bx, y:By} = endPoint;

        let dx = Bx - Ax;
        let dy = By - Ay;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance === 0) return;

        let offsetX = (dx / distance) * nodeRadius;
        let offsetY = (dy / distance) * nodeRadius;

        let startX = Ax + offsetX;
        let startY = Ay + offsetY;
        let endX = Bx - offsetX;
        let endY = By - offsetY;

        return [{x:startX, y:startY}, {x:endX, y:endY}];
    }
}