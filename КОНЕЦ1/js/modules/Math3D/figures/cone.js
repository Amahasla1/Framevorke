class Cone extends Figures {
    constructor(count = 20, h = 15, ) {
        super();
        const da = Math.PI * 2 / count;
        this.points = [];
        this.edges = [];
        this.polygons = [];

        // Создаем точки
        for (let phi = 0; phi < h; phi += da) {
            for (let psi = 0; psi < Math.PI * 2; psi += da) {
                const x = phi * Math.cos(psi);
                const y = phi * Math.sin(psi);
                const z = h - phi;
                this.points.push(new Point(x, y, -z));
            }
        }

        // Создаем ребра
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i + 1]) {
                if ((i + 1) % count === 0) {
                    this.edges.push(new Edge(i, i + 1 - count));
                } else {
                    this.edges.push(new Edge(i, i + 1));
                }
            }
        }

        // Создаем полигоны
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
