class Edge {
    constructor(from, to, nodes) {
        this.from = from;
        this.to = to;
        this.nodes = nodes;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.from[0], this.from[1]);
        ctx.lineTo(this.to[0], this.to[1]);
        ctx.stroke();
    }
}