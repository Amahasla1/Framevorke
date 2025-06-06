class ParabolicCylinder extends Figures {
    constructor( count = 18, a = 2, b = 3, c = 5 ) {
        super();
        this.points = [];
        this.edges = [];
        this.polygons = []
 
    for (let i = -count / 2; i <= count / 2; i++) {
        for (let j = -count / 2; j <= count / 2; j++) {
            this.points.push(new Point(
                b * Math.sinh(i / Math.PI),
                a * Math.cosh(i / Math.PI),
                c * j / Math.PI
            ));
        }
    } 


    for (let i = 0; i < this.points.length - 1; i++) {
        if (i % (count + 1) !== count) {
            this.edges.push(new Edge(i, i + 1));
        }

        if (this.points[i + count + 1]) {
            this.edges.push(new Edge(i, i + count + 1));
        }
    } 

    for (let i = 0; i < this.points.length; i++) {
        if (this.points[i + 1 + count] && i % (count + 1) !== count) {
            this.polygons.push(new Polygon([i, i + 1, i + 2 + count, i + 1 + count], '#ffff00'));
        }
    }    
   
            }
}
        