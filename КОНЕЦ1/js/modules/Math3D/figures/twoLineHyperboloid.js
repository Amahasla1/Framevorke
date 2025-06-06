class twoLineHyperboloid extends Figures {
    constructor(count = 20, a = 2, b = 2, c = 2, color = '#ffff00' ) {
    super();
    this.points = [];
    this.edges = [];
    this.polygons = []

    const dt = Math.PI * 2 / count;
    for (let i = 0; i <= Math.PI; i += dt) {
        for (let j = 0; j < 2 * Math.PI; j += dt) {
            this.points.push(new Point(
                a * Math.sinh(i) * Math.cos(j) / 10,
                b * Math.cosh(i) * Math.sin(j) / 10,
                c * Math.cosh(i) / 10,
            ));
        }
    }
    for (let i = 0; i <= Math.PI; i += dt) {
        for (let j = 0; j < 2 * Math.PI; j += dt) {
            this.points.push(new Point(
                -a * Math.sinh(i) * Math.cos(j) / 10,
                -b * Math.cosh(i) * Math.sin(j) / 10,
                -c * Math.cosh(i) / 10,
            ));
        }
    }

    for (let i = 0; i < this.points.length; i++) {
        //вдоль
        if (i + 1 < this.points.length && (i + 1) % count !== 0) {
            this.edges.push(new Edge(
                i,
                i + 1
            ));
        } else if (i + 1 >= count && (i + 1) % count === 0) {
            this.edges.push(new Edge(
                i,
                i + 1 - count
            ));
        }
    }

    for (let i = 0; i < this.points.length / 2 - count; i++) {
        if (i + 1 + count < this.points.length && (i + 1) % count !== 0) {
            this.polygons.push(new Polygon([
                i,
                i + 1,
                i + 1 + count,
                i + count
            ], color
            ));
        } else if (i + count < this.points.length && (i + 1) % count === 0) {
            this.polygons.push(new Polygon([
                i,
                i + 1 - count,
                i + 1,
                i + count
            ], color
            ));
        }
    }

    for (let i = this.points.length / 2; i < this.points.length; i++) {
        if (i + 1 + count < this.points.length && (i + 1) % count !== 0) {
            this.polygons.push(new Polygon([
                i,
                i + 1,
                i + 1 + count,
                i + count
            ], color
            ));
        } else if (i + count < this.points.length && (i + 1) % count === 0) {
            this.polygons.push(new Polygon([
                i,
                i + 1 - count,
                i + 1,
                i + count
            ], color
            ));
        }
    }

 }
}