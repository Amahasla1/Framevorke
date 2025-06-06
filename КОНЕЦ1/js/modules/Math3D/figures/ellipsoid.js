class Ellipsoid extends Figures {
    constructor ( count = 20, rX = 20, rY = 10, rZ = 6, color = '#ffff00') {
        super();
        this.points = [];
        this.edges = [];
        this.polygons = [];

    const da = Math.PI * 2 / count;

    for (let phi = 0; phi < Math.PI * 2; phi += da) { 
        for (let psi = 0; psi < Math.PI * 2 ; psi += da) {
            const x = rX * Math.sin(phi) * Math.cos(psi);
            const y = rY * Math.sin(phi) * Math.sin(psi);
            const z = rZ * Math.cos(phi);
            this.points.push(new Point(x, z, y));
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
            ], color));
        } 
    }
  }
}