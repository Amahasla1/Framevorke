class App extends Component {
    constructor(props) {
        super(props);
        this.header = new Header({
            id: 'header',
            parent: this.id,
            template: template.headerTemplate,
            callbacks: {
                showPage: (name) => this.showPage(name)
            }
        });

        this.graph3D = new Graph3D({
            id: 'graph3D',
            parent: this.id,
            template: template.graph3DTemplate,
        });

        this.showPage('graph3D')
    }



    showPage(name) {
        this.graph3D.hide();
        if (this[name] ?.show) {
            this[name].show();
        }
    }


}