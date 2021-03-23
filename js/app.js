const memory = {

    bankOfImages: [
        "bird",
        "brain",
        "christmas",
        "elephant",
        "eye",
        "kitchen",
        "leaves",
        "painting",
        "skull",
        "trees",
        "unicorn",
        "whale",
    ],

    init() {
        memory.createTiles(24);
        memory.setTileSize(6);
        memory.eventListener();
        memory.shuffleTiles();
        console.log('init');
    },

    createTiles(noTiles) {
        const memoryContainer = document.querySelector("#memory-container");
        for (let i = 0; i < noTiles; i++) {
            let image = memory.bankOfImages[Math.floor(i / 2)];
            let newTile = document.createElement("div");
            newTile.classList.add("tile");
            newTile.classList.add(i);
            newTile.classList.add("recto");
            newTile.setAttribute("data-img",image);
            newTile.style.background = `url(../images/${image}.png) center / cover`;

            memoryContainer.appendChild(newTile);
        }
    },

    setTileSize(noTilesPerRow) {
        const memoryContainer = document.querySelector("#memory-container");
        const memoryContainerStyles = window.getComputedStyle(memoryContainer);
        let tiles = document.querySelectorAll(".tile");
        for (let tile of tiles) {
            tile.style.width = tile.style.height = (parseInt(memoryContainerStyles.width) / noTilesPerRow) + "px";
        }
    },

    createRandomSet() {
        const randomSet = new Set();
        const tiles = document.querySelectorAll(".tile");
        for (let i = 0; i < tiles.length; i++) {
            while (randomSet.size != i + 1) { randomSet.add(Math.round(Math.random() * tiles.length)); }
        }
        return randomSet;
    },

    eventListener() {
        document.querySelector("#memory-container").addEventListener("click", memory.handleTileClick);
    },

    handleTileClick(event) {
        if (event.target.classList.contains("tile")) {
            event.target.classList.toggle('verso');
            event.target.classList.toggle('recto');
            if(event.target.classList.contains('verso')){
                event.target.style.background = `url(../images/tile_verso.jpg) 0% 0% / cover`;
            } else {
                event.target.style.background = `url(../images/${event.target.dataset.img}.png) center / cover`;
            }
        }
    },

    shuffleTiles(){
        let randomSetArray = Array.from(memory.createRandomSet());
        const tiles = document.querySelectorAll(".tile");
        for (let i = 0; i < tiles.length; i++){
            tiles[i].style.order = randomSetArray[i];
            tiles[i].classList.toggle('recto');
            tiles[i].classList.toggle('verso');
            tiles[i].style.background = `url(../images/tile_verso.jpg) 0% 0% / cover`;
        }
    },
}

document.addEventListener('DOMContentLoaded', memory.init);
// window.addEventListener('resize', memory.setTileSize(6));