const memory = {

    init() {
        memory.createTiles(20);
        memory.setTileSize(6);
        memory.eventListener();
        console.log('init');
    },

    createTiles(noTiles) {
        const memoryContainer = document.querySelector("#memory-container");
        for (let i = 0; i < noTiles; i++) {
            let newTile = document.createElement("div");
            newTile.classList.add("tile");
            newTile.classList.add("verso");
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

    eventListener() {
        document.querySelector("#memory-container").addEventListener("click", memory.handleTileClick);
    },

    handleTileClick(event) {
        if (event.target.classList.contains("tile")) {
            event.target.classList.toggle('verso');
            event.target.classList.toggle('recto');
        }
    }
}

document.addEventListener('DOMContentLoaded', memory.init);
// window.addEventListener('resize', memory.setTileSize(6));