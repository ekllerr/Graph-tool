import {ctx} from "../app.js";
export class Edge {
    constructor(fromNode, toNode) {
        this.fromNode = fromNode;
        this.toNode = toNode;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.fromNode.x, this.fromNode.y);
        ctx.lineTo(this.toNode.x, this.toNode.y);
        ctx.stroke();
    }
}