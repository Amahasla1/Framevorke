class ellipticalParaboloid extends Figures {
    constructor(length = 20, width = 20, p = 3, q = 4, count = 20, color = '#ffff00', ) {
        super();
    this.points = [];
    this.edges = [];
    this.polygons = []
   

    for (let i = 0; i <= length; i += length / count) {
        for (let j = 0; j <= width; j += width / count) {
            const x = - length / 2 + i;
            const y = - width / 2 + j;
            this.points.push(new Point(
                x,
                y,
                x * x / 2 / p + y * y / 2 / q
            ))
        }
    }



    for (let i = 0; i < this.points.length - 1; i++)
        if ((i + 1) % (count + 1) !== 0)
            this.edges.push(new Edge(i, i + 1))
    for (let i = 0; i < this.points.length - count; i++)
        if ((i + count + 1) !== (i + 1) * count && (i + count + 1) !== (count + 1) * (count + 1))
            this.edges.push(new Edge(i, i + count + 1))


    for (let j = 0; j < count; j++)
        for (let i = 0; i < count; i++)
            this.polygons.push(new Polygon([
                j * (count + 1) + i,
                j * (count + 1) + i + 1,
                j * (count + 1) + i + count + 2,
                j * (count + 1) + i + count + 1,
            ], color
            ));
    }
}