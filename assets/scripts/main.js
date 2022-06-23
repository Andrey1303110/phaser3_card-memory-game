let scene = new GameScene();

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    levels: {
        1: {
            rows: 1,
            cols: 4,
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
        5: {
            rows: 3,
            cols: 4,
            cards: [1, 2, 3, 4, 5, 6],
            timer: 35,
        },
        6: {
            rows: 3,
            cols: 6,
            cards: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            timer: 40,
        },
        7: {
            rows: 4,
            cols: 6,
            cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            timer: 50,
        },
        8: {
            rows: 4,
            cols: 7,
            cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            timer: 65,
        },
        9: {
            rows: 4,
            cols: 8,
            cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            timer: 80,
        },
    },
    level: 1,
    allCards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    scene: new GameScene(),
};

let game = new Phaser.Game(config);
