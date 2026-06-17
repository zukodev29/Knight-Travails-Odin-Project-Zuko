import Node from './node-template';

export default class ChessBoardGraph {
    constructor() {
         this.nodes = new Map();
         this.ChessBoardGraph = this.#initializeNode([0, 0]);
         }
        // return [[], [], []] containg [x, y] coords for every in range index of board;
        #getValideNeighborCoord(coord) {
        const coords = [];
        // front neighbor
        if(coord[1] !== 0) coords.push([coord[0], coord[1] - 1]);
        // back neighbor 
        if(coord[1] !== 7) coords.push([coord[0], coord[1] + 1]);
        // left neighbor
        if(coord[0] !== 0) coord.push([coord[0] - 1, coord[1]]);
        // right neighbor
        if(coord[0] !==7) coords.push([coord[0] + 1, coord[1]]);

        return coords;
       
    };

    // check if both [x, y] are between 0-7;
    #isInRange(coord) {
        return ((coord[0] >= 0 && coord[0] <= 7) && (coord[1] >0 && coord[1] <= 7));
    }

    #getValidKnightMov(coord) {
        const coords = [];
        const offsets = [
          [2, 1],
          [2, -1],
          [-2, 1],
          [-2, -1],
          [1, 2],
          [1, -2],
          [-1, 2],
          [-1, -2],
        ];
        // al possible knight moves offSets relative to current position
        for(const [x, y] of offsets) {
            if(this.#isInRange([coord[0] + x, coord[1] + y])) coord.push([coord[0] + x, coord[1] + y]);
        }
        return coords;
    }
    
    // initiale node or return if already exist
    #intializeNode(coord){
        if(this.nodes.has(String(coord))) return this.nodes.get(String(coord));

    // create a new node
    const newNode = new Node(coord);
    // set node  in set
    this.nodes.set(String(coord), newNode);
    // get all reasonable neighbor squares from that node
    const neighborCoord = this.#getValidKnightMov(coord);
    // recurse to create its neighbors
    neighborCoord.map(c => {
       newNode.connect(this.#intializeNode(c));
    });
    // must return newNode to recursion work, otherwise its neighbors returned from recursion would be undefined
    return newNode;
    }

    //must make a queue
    knightMoves(position, destination, queue = [{path: null, square: position}], visited = new Set()) {
        while(queue.length !== 0) {
        // it's an object {path, square};
        const branch = queue.shift();
        branch.path = branch.path ? [...branch.path, branch.square] : [branch.square];
        // check conditions
        if(visited.has(String(branch.square))) continue;
        if(String(branch.square) === String(destination)) return branch.path;
        // avoid cycles
        visited.add(String(branch.square));

        const nextMoviments = this.#getValidKnightMov(branch.square);
        nextMoviments.map( val => {
               queue.push({path: branch.path.slice(), square:val})
        });
        }
    }
}

const chess = new ChessBoardGraph();
// console.log(chess.nodes.entries());
// console.log("//");
// console.log(chess.nodes.get("0,0").left)
console.log(chess.knightMoves([0,0], [7, 0]));