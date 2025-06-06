class kleinBottle extends Figures {
    constructor(count = 20 ) {
    super();
    this.points = [];
    this.edges = [];
    this.polygons = [];
    const da = Math.PI * 2  / count;
    for (let phi = 0; phi < Math.PI * 2 ; phi += da) {
        for (let psi = 0; psi < Math.PI * 2; psi += da) {
            const c = 4 - 2 * Math.cos(phi);
            const x = (6*Math.cos(phi)*(1+Math.sin(phi))) + c*Math.cos(phi+psi)
            const y = 16 * Math.sin(phi);
            const z = c * Math.sin(psi);
            this.points.push(new Point(x, y, z));
        }
    }

    for (let i = 0; i < this.points.length; i++) {
        if (this.points[i + 1]) {
            if ((i + 1) % count === 0) {
                this.edges.push(new Edge(i, i + 1 - count));
            } else {
                this.edges.push(new Edge(i, i + 1));
            }
        }
        if (this.points[i + count]) {
            this.edges.push(new Edge(i, i + count));
        } else {
            this.edges.push(new Edge(i, i % count));
        }
    }

    for (let i = 0; i < this.points.length; i++) {
        if (this.points[i + count + 1]) {
            this.polygons.push(new Polygon([
                i,
                i + 1,
                i + count + 1,
                i + count
            ], '#ffff00'));
        } else if (this.points[i + 1]) {
            this.polygons.push(new Polygon([
                i,
                i + 1,
                (i + 1) % count,
                i % count
            ], '#ffff00'));
        }
    }
    
}
}