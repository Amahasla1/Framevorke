class Graph3D extends Component {
    constructor(options) {
        super(options);
        this.WIN = {
            LEFT: -5,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10,
            LIGHT: new Light(-40, 5, 10, 25000),
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50)
        };

        this.scene = new Cube();
        this.math3D = new Math3D({
            WIN: this.WIN
        });
        this.canvas = new Graph({
            id: 'canvas3D',
            width: 600,
            height: 600,
            WIN: this.WIN,
            callbacks: {
                wheel: event => this.wheel(event),
                mouseup: () => this.mouseup(),
                mousedown: event => this.mousedown(event),
                mousemove: event => this.mousemove(event),
                mouseleave: () => this.mouseleave(),
            }
        });

        this.canRotate = false;
        this.dx = 0;
        this.dy = 0;
        this.renderFrame();
    }

    mouseup() {
        this.canRotate = false;
    }

    mouseleave() {
        this.canRotate = false;
    }

    mousedown(event) {
        this.canRotate = true;
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    wheel(event) {
        const delta = event.wheelDelta > 0 ? 1.1 : 0.9;
        this.scene.points.forEach(point =>
            this.math3D.zoom(delta, point)
        );
        this.renderFrame();
    }

    mousemove(event) {
        if (this.canRotate) {
            const gradus = Math.PI / 180 / 10
            this.scene.points.forEach(point => {
                this.math3D.rotateOy((this.dx - event.offsetX) * gradus, point);
                this.math3D.rotateOx((this.dy - event.offsetY) * gradus, point);
            });
            this.dx = event.offsetX;
            this.dy = event.offsetY;
            this.renderFrame();
        }
    }

    addEventListeners() {
        document.getElementById('selectSurface').addEventListener('change', (event) => {
            switch (event.target.value) {
                case 'cube': this.scene = new Cube(); break
                case 'cone': this.scene = new Cone(); break
                case 'sphere': this.scene = new Sphere(); break
                case 'thor': this.scene = new Thor(); break
                case 'ellipsoid': this.scene = new Ellipsoid(); break
                case 'ellipticalCylinder': this.scene = new EllipticalCylinder(); break
                case 'parabolicCylinder': this.scene = new ParabolicCylinder(); break
            }
        });
    }

    renderFrame() {
        if (!this.scene) return;
        this.canvas.clear();

        //  console.log(this.scene);

        // полигоны
        this.math3D.calcDistance(this.scene, this.LIGHT, 'lumen');
        const lumen = this.math3D.calcIllumination(polygon.Lumen, this.LIGHT.Lumen);
        let {r, g, b} = polygon.color;
        r = Math.round (r*lumen);
        g = Math.round (g*lumen);
        b = Math.round (b*lumen);
        this.canvas.polygon(array,polygon.rgbToHex (r, g, b));s                                    kdjhfgjhdfjhgjdfjhghdfhjghdjfhgjhjdfhjgkkdfhkgjd

        this.math3D.calcDistance(this.scene, this.WIN.CAMERA, 'distance');
        this.math3D.sortByArtistAlgorithm(this.scene.polygons);
        this.scene.polygons.forEach(polygon => {
            const array = [];
            polygon.points.forEach(index =>
                array.push({
                    x: this.math3D.xs(this.scene.points[index]),
                    y: this.math3D.ys(this.scene.points[index]),
                })
            );
            this.canvas.polygon(array, polygon.color)
        });

        // рёбра
        this.scene.edges.forEach(edge => {
            const p1 = this.scene.points[edge.p1];
            const p2 = this.scene.points[edge.p2];
            this.canvas.line(
                this.math3D.xs(p1),
                this.math3D.ys(p1),
                this.math3D.xs(p2),
                this.math3D.ys(p2),
            )
        });

        
        // точки
        this.scene.points.forEach(p => this.canvas.point(
            this.math3D.xs(p),
            this.math3D.ys(p),
        ));
        
    }
}   