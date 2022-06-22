let scene = new GameScene();

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    levels: {
        1: {
            rows: 2,
            cols: 2,
            cards: [1, 2],
            timer: 15,
        },
        2: {
            rows: 2,
            cols: 3,
            cards: [3, 4, 5],
            timer: 20,
        },
        3: {
            rows: 2,
            cols: 4,
            cards: [1, 2, 3, 4],
            timer: 25,
        },
        4: {
            rows: 2,
            cols: 5,
            cards: [1, 2, 3, 4, 5],
            timer: 30,
        },
    },
    level: 1,
    allCards: [1, 2, 3, 4, 5],
    scene: new GameScene(),
};

let game = new Phaser.Game(config);
