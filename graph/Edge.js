import {ctx, nodeRadius} from "../app.js";

export class Edge {
    constructor(fromNode, toNode, offset = 0, isDirected = 'false') {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.isDirected = isDirected;
        this.offset = offset;
        // console.log(`Edge created, fromNode: ${this.fromNode.label}, toNode: ${this.toNode.label}`);
    }

    draw(color = 'black') {
        const startPoint = {x: this.fromNode.x, y: this.fromNode.y};
        const endPoint = {x: this.toNode.x, y: this.toNode.y};
        const [start, end] = this.calculateEdgeEndpoints(startPoint, endPoint);

        this.drawBezierEdge(start,end, this.offset, color);

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

    drawBezierEdge(start, end, offset, color){
        const controlPoint = this.calculateControlPoint(start,end,offset);

        // console.log(`control point: (${controlPoint.x},${controlPoint.y})`);

        ctx.strokeStyle = color;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, end.x, end.y);
        ctx.stroke();
    }

    drawArrow(){
        // console.log(`drawing Arrow on Edge from (${this.fromNode.x}, ${this.fromNode.y} to ${this.toNode.x}, ${this.toNode.y})`);
        /*const start = {
            x: this.fromNode.x,
            y: this.fromNode.y
        };

        const end = {
            x: this.toNode.x,
            y: this.toNode.y
        }
        const controlPoint = this.calculateControlPoint(start,end, this.offset);

        const t = 0.5;

        const mid = {
            x: (1 - t) ** 2 * start.x + 2 * (1 - t) * t * controlPoint.x + t ** 2 * end.x,
            y: (1 - t) ** 2 * start.y + 2 * (1 - t) * t * controlPoint.y + t ** 2 * end.y
        }



        const tangent = {
            x: 2 * (1 - t) * (controlPoint.x - start.x) + 2 * t * (end.x - controlPoint.x),
            y: 2 * (1 - t) * (controlPoint.y - start.y) + 2 * t * (end.y - controlPoint.y)
        };
        
        const normalizedTangent = this.normalizeVector(tangent);

        // const perpendicular = { x: -normalizedTangent.y, y: normalizedTangent.x };
        const angle = Math.atan2(normalizedTangent.y, normalizedTangent.x) * 180/Math.PI;

        const arrowSize = 10;

        const p1 = {
            x: mid.x - Math.cos(angle) * arrowSize,
            y: mid.y - Math.sin(angle) * arrowSize
        };

        const p2 = {
            x: mid.x + Math.cos(angle) * (arrowSize / 2),
            y: mid.y + Math.sin(angle) * (arrowSize / 2)
        };

        const p3 = {
            x: mid.x - Math.cos(angle * Math.PI /2) * (arrowSize / 2),
            y: mid.y - Math.sin(angle * Math.PI /2) * (arrowSize / 2)
        };


        ctx.beginPath();
        /!*ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();*!/
        ctx.moveTo(p3.x,p3.y);
        ctx.lineTo(p1.x,p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();*/

        const start = {
            x: this.fromNode.x,
            y: this.fromNode.y
        }

        const end = {
            x: this.toNode.x,
            y: this.toNode.y
        }

        const controlPoint = this.calculateControlPoint(start,end,this.offset);

        const t = 0.5;

        const mid = {
            x: (1 - t) ** 2 * start.x + 2 * (1 - t) * t * controlPoint.x + t ** 2 * end.x,
            y: (1 - t) ** 2 * start.y + 2 * (1 - t) * t * controlPoint.y + t ** 2 * end.y
        }

        const arrowSize = 10;
        const angle = Math.atan2(start.y - end.y,start.x - end.x) /*- Math.PI*/;

        // console.log(`Angle: ${angle}`);

        const p1 = {
            x: mid.x + arrowSize * Math.cos(angle - Math.PI/6),
            y: mid.y + arrowSize * Math.sin(angle - Math.PI/6),
        };

        const p2 = {
            x: mid.x + arrowSize * Math.cos(angle + Math.PI/6),
            y: mid.y + arrowSize * Math.sin(angle + Math.PI/6),
        }

        ctx.beginPath();
        ctx.moveTo(mid.x, mid.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath()
        ctx.fill();

    }

    calculateControlPoint(start,end,offset){
        const mid = {x: (start.x + end.x) / 2,y: (start.y + end.y) / 2};

        const vector = {x: end.x - start.x, y: end.y - start.y};
        const perpendicular = {x: -vector.y, y: vector.x};

        const normalizedVector = this.normalizeVector(perpendicular);
        return {
            x: mid.x + normalizedVector.x * offset,
            y: mid.y + normalizedVector.y * offset
        };
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