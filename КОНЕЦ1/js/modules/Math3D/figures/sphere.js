class Sphere extends Figures {
    constructor(count = 30, r = 10, color = '#ffff00', x0 = 0, y0 = 0, z0 = 0) {
        super();
        this.points = [];
        this.edges = [];
        this.polygons = [];

        const da = Math.PI * 2 / count;

        // Создание точек
        for (let phi = 0; phi < Math.PI * 2; phi += da) {
            for (let psi = 0; psi < 2 * Math.PI; psi += da) {
                const x = x0 + r * Math.sin(phi) * Math.cos(psi);
                const y = y0 + r * Math.sin(phi) * Math.sin(psi);
                const z = z0 + r * Math.cos(phi);
                this.points.push(new Point(x, y, z));
            }
        }

        // Создание рёбер
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

        // Создание полигонов
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
