class Component {
    constructor({ id, parent, callbacks = {}, }) {
        this.id = id;
        this.parent = parent;
        this.callbacks = callbacks;
        this.addEventListeners();
    }

    render(template, className) {
        const elem = document.createElement('div');
        elem.setAttribute('id', this.id);
        if (className) {
            elem.classList.add(className);
        }
        elem.innerHTML = template;
        if (this.parent) {
            document.getElementById(this.parent).appendChild(elem);
        } else {
            document.querySelector('body').appendChild(elem);
        }
    }

    addEventListeners() {

    }
}