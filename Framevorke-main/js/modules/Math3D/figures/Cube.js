class Cube extends Figure {
    constructor (size = 10) {
        super ( );
        this.point = [
            new Point(size, size, size),
            new Point(size, -size, size),
            new Point(-size, -size, size),
            new Point(-size, size, size),
            new Point(-size, size, -size),
            new Point(size, size, -size),
            new Point(size, -size, -size),
            new Point(-size, -size, -size),
        ];
            class Cube extends Figure {
                constructor (size = 10) {
                    super ();
                    this.edges = [
                        new Edge(0, 1),
                        new Edge(1, 2),
                        new Edge(2, 3),
                        new Edge(3, 0),
                        new Edge(0, 5),
                        new Edge(1, 6),
                        new Edge(2, 7),
                        new Edge(3, 4),
                        new Edge(4, 5),
                        new Edge(5, 6),
                        new Edge(6, 7),
                        new Edge(7, 4)      
                       // fdgf
                    ];
                }
            }
    }
}