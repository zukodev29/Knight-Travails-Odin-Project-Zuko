export default class Node{
    constructor(coords) {
        this.coords = coords;
        this.neighbors = [];
    }

    get front() {
        const f = this.neighbors.find(node => String(node.coords) === String([this.coords[0], this.coords[1] + 1]));
        return f;
    }

    get back() {
        const b = this.neighbors.find(node => String(node.coords) === String([this.coords[0], this.coords[1] - 1]));
        return b;
    }

    get left() {
        const l = this.neighbors.find(node => String(node.coords) === String([this.coords[0] - 1, this.coords[1]]));
        return l;
    }

    get right() {
        const r = this.neighbors.find(node => String(node.coords) === String([this.coords[0] + 1, this.coords[1]]));
        return r;
    }

    connect(node){
        if(!(node instanceof Node)) throw new Error("invalid node argument");
        this.neighbors.push(node);
    };

    disconnect(node) {
        if(!(node instanceof Node)) throw new Error("invalid node argument");
        this.neighbors = this.neighbors.filter(val => val !== node);
    };
}