class EllipticalCylinder extends Figures {
    constructor (count = 20, a = 8, b = 5, height = 10 ) {
        super();
        this.points = [];
        this.edges = [];
        this.polygons = []

    const da = Math.PI * 4 / count;

    for (let phi = -Math.PI * 2; phi < Math.PI * 2; phi += da) {
        for (let psi = -Math.PI * 2; psi < Math.PI * 2; psi += da) {
            const x = a * Math.cos(phi);
            const y = b * Math.sin(phi);
            const z = height * Math.sin(psi);

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
        }
    }
    
    }
}