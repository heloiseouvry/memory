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

    score: 0,
    consecutiveScore: 0,
    bestConsecutiveScore: 0,
    rectoTiles: [],
    params: {
        theme: ["classic", "lpr"],
        difficulty: ["easy", "normal", "hard"],
        selectedTheme: "classic",
        selectedDifficulty: "normal"
    },

    init() {
        document.querySelector("#start-menu__form").addEventListener("submit", memory.handleFormSubmit);
        
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
            newTile.setAttribute("data-img", image);
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
    },

    handleTileClick(event) {
        //we check that we haven't clicked on the parent container
        if (event.target.classList.contains("tile")) {
            switch (memory.rectoTiles.length) {
                case 0:
                    memory.addRectoTile(event.target);
                    break;
                case 1:
                    memory.addRectoTile(event.target);
                    memory.checkTwoTiles(memory.rectoTiles[0], memory.rectoTiles[1]);
                    // setTimeout(memory.hideTiles, 1000);
                    break;
            }
        }
    },

    shuffleTiles() {
        let randomSetArray = Array.from(memory.createRandomSet());
        const tiles = document.querySelectorAll(".tile");
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].style.order = randomSetArray[i];
            this.fromRectoToVerso(tiles[i]);
        }
    },

    fromRectoToVerso(tile) {
        tile.classList.toggle('verso');
        tile.classList.toggle('recto');
        tile.style.background = `url(../images/tile_verso.jpg) 0% 0% / cover`;
    },

    fromVersoToRecto(tile) {
        tile.classList.toggle('verso');
        tile.classList.toggle('recto');
        tile.style.background = `url(../images/${tile.dataset.img}.png) center / cover`;
    },

    checkTwoTiles(tile1, tile2) {
        if (tile1.dataset.img === tile2.dataset.img) {
            console.log("Ce sont les mêmes !");
            memory.score++;
            memory.displayScore(memory.score);
            memory.consecutiveScore++;
            if(memory.consecutiveScore > memory.bestConsecutiveScore){memory.bestConsecutiveScore = memory.consecutiveScore}
            memory.displayConsecutiveScore(memory.bestConsecutiveScore);
            memory.rectoTiles = [];
        } else {
            memory.consecutiveScore = 0;
            setTimeout(memory.hideTiles, 500);
        }

    },

    addRectoTile(tile) {
        if (tile.classList.contains('verso')) {
            memory.fromVersoToRecto(tile);
            memory.rectoTiles.push(tile);
        }
    },

    hideTiles() {
        memory.fromRectoToVerso(memory.rectoTiles[0]);
        memory.fromRectoToVerso(memory.rectoTiles[1]);
        memory.rectoTiles = [];
    },

    displayScore() {
        const scoreSpan = document.querySelector("#score");
        scoreSpan.textContent = memory.score;
    },

    displayConsecutiveScore() {
        const consecutiveScorePara = document.querySelector(".consecutive-score-text");
        const consecutiveScoreSpan = document.querySelector("#consecutive-score");
        consecutiveScoreSpan.textContent = memory.bestConsecutiveScore;
        if(memory.bestConsecutiveScore > 1){consecutiveScorePara.style.display = "inline";}
    },

    handleFormSubmit(event) {
        event.preventDefault();
        for(const theme of memory.params.theme){
            if(document.querySelector(`#start-menu__form__theme--${theme}`).checked){memory.params.selectedTheme = theme};
        }
        for(const difficulty of memory.params.difficulty){
            if(document.querySelector(`#start-menu__form__difficulty--${difficulty}`).checked){memory.params.selectedDifficulty = difficulty};
        }
        memory.launchGame();
    },

    launchGame() {
        document.querySelector("#start-menu").style.display = "none";
        memory.createTiles(24);
        memory.setTileSize(6);
        document.querySelector("#memory-container").addEventListener("click", memory.handleTileClick);
        memory.shuffleTiles();
        memory.displayScore(memory.score);
    },
}

document.addEventListener('DOMContentLoaded', memory.init);
// window.addEventListener('resize', memory.setTileSize(6));