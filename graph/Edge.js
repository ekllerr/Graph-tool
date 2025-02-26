import {ctx, nodeRadius} from "../app.js";

export class Edge {
    constructor(fromNode, toNode, offset = 0, isDirected = false) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.isDirected = isDirected;
        this.offset = offset;
    }

    draw() {
        const startPoint = {x: this.fromNode.x, y: this.fromNode.y};
        const endPoint = {x: this.toNode.x, y: this.toNode.y};
        const [start, end] = this.calculateEdgeEndpoints(startPoint, endPoint);

        this.drawBezierEdge(start,end, this.offset);

    }

    calculateEdgeEndpoints(startPoint, endPoint){
        const {x: Ax, y: Ay} = startPoint;
        const {x: Bx, y:By} = endPoint;

        const vector = {x: Bx - Ax, y: By - Ay};
        const normalizedVector = this.normalizeVector(vector);

        if(!normalizedVector.x && !normalizedVector.y) return [startPoint, endPoint];

        // Calculate the start and end points of the edge, adjusting for the node radius,
        // so that the edge starts and ends at the node's border, not at its center.
        const start = {
            x: Ax + normalizedVector.x * nodeRadius,
            y: Ay + normalizedVector.y * nodeRadius
        }
        const end = {
            x: Bx - normalizedVector.x * nodeRadius,
            y: By - normalizedVector.y * nodeRadius
        }

        return [start,end];
    }

    drawBezierEdge(start, end, offset){
        const mid = {x: (start.x + end.x) / 2,y: (start.y + end.y) / 2};

        const vector = {x: end.x - start.x, y: end.y - start.y};
        const perpendicular = {x: -vector.y, y: vector.x};

        const normalizedVector = this.normalizeVector(perpendicular);
        const controlPoint = {
            x: mid.x + normalizedVector.x * offset,
            y: mid.y + normalizedVector.y * offset
        };

        console.log(`offset for edge between nodes: ${start} and ${end} is: ${offset}`);

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, end.x, end.y);
        ctx.stroke();
    }

    normalizeVector(vector) {
        const length = Math.sqrt(vector.x ** 2 + vector.y ** 2);

        if (length === 0) return;

        return {
            x: vector.x / length,
            y: vector.y / length,
        };
    }
}