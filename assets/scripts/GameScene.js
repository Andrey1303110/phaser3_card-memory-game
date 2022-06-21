class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }
    preload(){
        this.load.image('bg', "assets/sprites/bg.jpg");
        this.load.image('card', "assets/sprites/card.png")
    }
    create(){
        this.add.sprite(0, 0, 'bg').setOrigin(0);
        let positions = this.getCardsPositions();
        for (let position of positions) {
            this.add.sprite(position.x, position.y, 'card').setOrigin(0);
        }
    }
    getCardsPositions(){
        let positions = [];
        let gap = 5;
        let cardTexture = this.textures.get('card').getSourceImage();
        let cardWidth = cardTexture.width + gap;
        let cardHeight = cardTexture.height + gap * 2;
        let offsetX = (config.width - cardWidth * config.cols) / 2;
        let offsetY = (config.height - cardHeight * config.rows) / 2;
    
        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                positions.push({
                    x: offsetX + col * cardWidth,
                    y: offsetY + row * cardHeight,
                })
            }
        }
    
        return positions;
    }
}
