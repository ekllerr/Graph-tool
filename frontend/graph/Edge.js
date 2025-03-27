import {ctx, graph, nodeRadius, toggleEdgeDirectionInput} from "../../app.js";

export class Edge {
    constructor(fromNode, toNode, offset = 0, isDirected = 'false', weight = 0) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.isDirected = isDirected;
        this.offset = offset;
        this.weight = weight;
    }

    draw(color = 'black') {
        if(this.fromNode === this.toNode){
            this.drawLoop();
            return;
        }

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

        ctx.strokeStyle = color;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, end.x, end.y);
        ctx.stroke();
    }

    drawLoop(){
        const loopRadius = this.offset === 0 ? nodeRadius * 1.5 : nodeRadius + Math.abs(this.offset/2);
        const direction = this.offset >= 0 ? 1 : -1;
        const [x,y] = [this.fromNode.x + loopRadius * direction, this.toNode.y];

        const theta = Math.asin(nodeRadius/loopRadius);


        function drawLoopForPositiveOffset(){
            const startAngle1 = 0;
            const startAngle2 = Math.PI + theta;
            const endAngle1 = Math.PI - theta;
            const endAngle2 = Math.PI * 2;

            ctx.beginPath();
            ctx.arc(x, y, loopRadius, startAngle1, endAngle1);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y, loopRadius, startAngle2, endAngle2);
            ctx.stroke();
        }

        function drawLoopForNegativeOffset(){
            const startAngle = theta;
            const endAngle = Math.PI * 2 - theta;

            ctx.beginPath();
            ctx.arc(x, y, loopRadius, startAngle, endAngle);
            ctx.stroke();
        }

        this.offset >= 0 ? drawLoopForPositiveOffset() : drawLoopForNegativeOffset();

    }

    drawArrow(){
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