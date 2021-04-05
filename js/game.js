// const memory = import("./memory.js");
import {memory} from "./memory.js";

const game = {
    params: {
        theme: ["classic", "lpr"],
        difficulty: ["easy", "normal", "hard"],
        selectedTheme: "classic",
        selectedDifficulty: "normal"
    },

    init() {
        document.querySelector("#start-menu__form").addEventListener("submit", game.handleFormSubmit);
        console.log('game init');
    },

    handleFormSubmit(event) {
        event.preventDefault();
        for (const theme of game.params.theme) {
            if (document.querySelector(`#start-menu__form__theme--${theme}`).checked) { game.params.selectedTheme = theme };
        }
        for (const difficulty of game.params.difficulty) {
            if (document.querySelector(`#start-menu__form__difficulty--${difficulty}`).checked) { game.params.selectedDifficulty = difficulty };
        }
        memory.launchGame(game.params);
    },
};

document.addEventListener('DOMContentLoaded', game.init);