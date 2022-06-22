class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    preload(){
        this.load.image('bg', "assets/sprites/bg.jpg");
        this.load.image('card', "assets/sprites/card.png");
        for (let value of config.cards) {
            this.load.image(`card${value}`, `assets/sprites/card${value}.png`);
        }
    }

    create(){
        this.createBackground();
        this.createText();
        this.createCards();
        this.start();
    }

    createText(){
        this.timeoutText = this.add.text(5, config.height/2, "Time:", {
            font: '36px dirtybrush',
            fill: '#000000'
        }).setOrigin(0, 0.5);
    }

    start(){
        this.openedCard = null;
        this.openedCardsCount = 0;
        this.initCards();
    }

    initCards(){
        let positions = this.getCardsPositions();

        this.cards.forEach(card => {
            let position = positions.pop();
            card.close();
            card.setPosition(position.x, position.y);
        })
    }

    createBackground(){
        this.add.sprite(0, 0, 'bg').setOrigin(0);
    }

    createCards(){
        this.cards = [];

        for (let value of config.cards) {
            for(let i = 0; i < 2; i++) {
                this.cards.push(new Card(this, value))
            }
        }

        this.input.on("gameobjectdown", this.onCardClicked, this);
    }

    onCardClicked(pointer, card){
        if (card.opened) {
            return false;
        }

        if(this.openedCard){
            if (this.openedCard.value === card.value) {
                this.openedCard = null;
                this.openedCardsCount++;
            }
            else {
                this.openedCard.close();
                this.openedCard = card;
            }
        }
        else {
            this.openedCard = card;
        }
        card.open();

        if (this.openedCardsCount === this.cards.length/2) {
            this.start()
        }
    }

    getCardsPositions(){
        let positions = [];
        let gap = 5;
        let cardTexture = this.textures.get('card').getSourceImage();
        let cardWidth = cardTexture.width + gap;
        let cardHeight = cardTexture.height + gap * 2;
        let offsetX = (config.width - cardWidth * config.cols) / 2 + cardWidth / 2;
        let offsetY = (config.height - cardHeight * config.rows) / 2 + cardHeight / 2;
    
        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                positions.push({
                    x: offsetX + col * cardWidth,
                    y: offsetY + row * cardHeight,
                })
            }
        }
    
        return Phaser.Utils.Array.Shuffle(positions);
    }
}
