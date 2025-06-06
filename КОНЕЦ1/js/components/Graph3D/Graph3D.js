window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


class Graph3D extends Component {
    constructor(options) {
        super(options);
        this.WIN = {
            LEFT: -5    ,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10,
            LIGHT: new Light(-40, 5, 10, 25000),
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -60)
            
        };

        this.drawPoints = true;
        this.drawEdges = true;
        this.drawPolygons = true;

        this.colorPoints = 'black';
        this.colorEdges = 'black';
        this.colorPolygons = 'black';
        
        this.scene = new Cube();
        this.math3D = new Math3D({
            WIN: this.WIN
        });
        this.canvas = new Graph({
            id: 'canvas3D',
            width: 700,
            height: 700,
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

        let FPS = 0;
        let countFPS = 0;
        let timestamp = Date.now();

        const renderLoop = () => {
            countFPS++;
            const currentTimestamp = Date.now();
            if (currentTimestamp - timestamp >= 1000) {
                FPS = countFPS;
                countFPS = 0;
                timestamp = currentTimestamp;
            }

            this.renderFrame(FPS);
            requestAnimFrame(renderLoop);
        }
        renderLoop();
    
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
        document.querySelectorAll('.customSurface').forEach(checkbox => {
            checkbox.addEventListener('click', (event) => {
                this[event.target.dataset.custom] = !!event.target.checked;
            })
        });
    
         document.getElementById('colorPoints').addEventListener('change', (e) => {
            this.colorPoints = e.target.value;
        });

        document.getElementById('colorEdges').addEventListener('change', (e) => {
            this.colorEdges = e.target.value;
        });

        document.getElementById('colorPolygons').addEventListener('change', (e) => {
            this.colorPolygons = e.target.value
        });
        
        document.getElementById('selectSurface').addEventListener('change', (event) => {
            switch (event.target.value) {
                case 'cube': this.scene = new Cube(); break
                case 'cone': this.scene = new Cone(); break
                case 'sphere': this.scene = new Sphere(); break
                case 'thor': this.scene = new Thor(); break
                case 'ellipsoid': this.scene = new Ellipsoid(); break
                case 'ellipticalCylinder': this.scene = new ellipticalCylinder(); break
                case 'parabolicCylinder': this.scene = new ParabolicCylinder(); break
                case 'singleLineHyperboloid': this.scene = new singleLineHyperboloid(); break
                case 'twoLineHyperboloid': this.scene = new twoLineHyperboloid(); break
                case 'ellipticalParaboloid': this.scene = new ellipticalParaboloid(); break
                case 'hyperbolicParaboloid': this.scene = new hyperbolicParaboloid(); break
                case 'kleinBottle': this.scene = new kleinBottle(); break
                case 'hyperbolicCylinder': this.scene = new hyperbolicCylinder(); break
            }
        });
    }

    renderFrame(FPS) {
        if (!this.scene) return;
        this.canvas.clear();
        
        document.getElementById('FPS').innerHTML = "FPS: " + FPS

        // полигоны
         if (this.drawPolygons){
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
    

         this.scene.polygons.forEach(polygon => {
              const array = [];
                polygon.points.map(index =>
                array.push({
                    x: this.math3D.xs(this.scene.points[index]),
                    y: this.math3D.ys(this.scene.points[index]),
                })
            );
            this.math3D.calcDistance(this.scene, this.WIN.LIGHT, 'lumen');
                const lumen = this.math3D.calcIllumination(polygon.lumen, this.WIN.LIGHT.lumen);
                polygon.color = this.colorPolygons
                let { r, g, b } = polygon.color;
                
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
               
                this.canvas.polygon(array, polygon.rgbToHex(r, g, b));
            });
        }   
        
        // рёбра
        if (this.drawEdges){
        this.scene.edges.forEach(edge => {
            const p1 = this.scene.points[edge.p1];
            const p2 = this.scene.points[edge.p2];
            this.canvas.line(
                this.math3D.xs(p1),
                this.math3D.ys(p1),
                this.math3D.xs(p2),
                this.math3D.ys(p2),
                this.colorEdges
            )
        });
    }
        
        // точки
        if(this.drawPoints){
        this.scene.points.forEach(p => this.canvas.point(
            this.math3D.xs(p),
            this.math3D.ys(p),
            this.colorPoints
        ));
        
    }
}
}   