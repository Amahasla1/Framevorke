class hyperbolicCylinder extends Figures {
    constructor(count = 20, a = 5, b = 3, width = 3, color = '#ffff00') {
    super();
    this.points = [];
    this.edges = [];
    this.polygons = []
 
    
    const dt = 2 * Math.PI / count;
    for (let i = -Math.PI; i <= Math.PI; i += dt) {
        for (let j = -Math.PI; j < Math.PI; j += dt) {
            this.points.push(new Point(
                b * Math.sinh(i) / 5,
                j * width / 5,
                a * Math.cosh(i) / 5,
            ));
        }
    }
    for (let i = -Math.PI; i <= Math.PI; i += dt) {
        for (let j = -Math.PI; j < Math.PI; j += dt) {
            this.points.push(new Point(
                -b * Math.sinh(i) / 5,
                j * width / 5,
                -a * Math.cosh(i) / 5,
            ));
        }
    }
    
    for (let i = 0; i < this.points.length / 2 - count; i++) {
        //вдоль
        if (i + 1 < this.points.length && (i + 1) % count !== 0) {
            this.edges.push(new Edge(
                i,
                i + 1
            ));
        } else if ((i + 1) % count === 0) {
            this.edges.push(new Edge(
                i,
                i + 1 - count
            ));
        }
        //поперек
        if (i < this.points.length - count) {
            this.edges.push(new Edge(
                i,
                i + count
            ));
        }
    }

    for (let i = this.points.length / 2; i < this.points.length; i++) {
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


    for (let i = 0; i < this.points.length / 2 - count; i++) {
        if (i + 1 + count < this.points.length && (i + 1) % count !== 0) {
            this.polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count],color));
        } else if (i + count < this.points.length && (i + 1) % count === 0) {
            this.polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count],color))
        }
    }
    for (let i = this.points.length / 2 + count / 2; i < this.points.length; i++) {
        if (i + 1 + count < this.points.length && (i + 1) % count !== 0) {
            this.polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count],color));
        } else if (i + count < this.points.length && (i + 1) % count === 0) {
            this.polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count],color))
        }
    }
}
}