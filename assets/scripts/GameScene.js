class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    preload(){
        this.load.image('bg', "assets/sprites/bg.jpg");
        this.load.image('card', "assets/sprites/card.png");
        for (let value of config.allCards) {
            this.load.image(`card${value}`, `assets/sprites/card${value}.png`);
        }

        this.load.audio('card', "assets/sounds/card.mp3");
        this.load.audio('complete', "assets/sounds/complete.mp3");
        this.load.audio('success', "assets/sounds/success.mp3");
        this.load.audio('theme', "assets/sounds/theme.mp3");
        this.load.audio('timeout', "assets/sounds/timeout.mp3");
    }

    createSounds(){
        this.sounds = {
            card: this.sound.add('card'),
            complete: this.sound.add('complete'),
            success: this.sound.add('success'),
            theme: this.sound.add('theme', {volume: 0.1}),
            timeout: this.sound.add('timeout'),
        }
        this.sounds.theme.loop = true;
        this.sounds.theme.play();
    }

    create(){
        this.currentScore = 0;
        this.currentLevel = config.level;
        this.maxLevel = Object.keys(config.levels)[Object.keys(config.levels).length-1];
        this.createSounds();
        this.createBackground();
        this.createTimer();
        this.createText();
        this.updateScore();
        this.start();
    }

    createBackground(){
        this.add.sprite(0, 0, 'bg').setOrigin(0);
    }

    onTimerTick(){
        this.timeoutText.setText(`Time: ${this.timeout}`);
        if (this.timeout <= 0) {
            this.timer.paused = true;
            this.sounds.timeout.play();
            this.restart();   
        }
        else {
            this.timeout--;
        }
    }

    createTimer(){
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true,
        });
    }

    createText(){
        this.levelText = this.add.text(8, config.height/2 - 75, '', {
            font: '32px pinkchicken',
            fill: '#fff',
        }).setOrigin(0, 0.5);
        this.scoreText = this.add.text(8, config.height/2, '', {
            font: '32px pinkchicken',
            fill: '#fff',
        }).setOrigin(0, 0.5);
        this.timeoutText = this.add.text(8, config.height/2 + 75, '', {
            font: '32px pinkchicken',
            fill: '#fff',
        }).setOrigin(0, 0.5);
    }

    updateScore(score){
        if (!score) {
            this.scoreText.setText(`Score: ${this.currentScore}`);
        }
        else {
            let newScore = Number(this.currentScore) + Number(score);
            this.currentScore = newScore;
            this.scoreText.setText(`Score: ${this.currentScore}`);
        }
    }

    start(){
        console.log('start');
        this.config = {
            rows: config.levels[this.currentLevel].rows,
            cols: config.levels[this.currentLevel].cols,
            timeout: config.levels[this.currentLevel].timer,
            cards: config.levels[this.currentLevel].cards,
        };
        this.levelText.setText(`Level: ${this.currentLevel}/${this.maxLevel}`);
        this.createCards();
        this.initCardsPositions();
        this.timeout = this.config.timeout;
        this.timer.paused = false;
        this.openedCard = null;
        this.openedCardsCount = 0;
        this.streak = 0;
        this.mistake = false;
        this.initCards();
        this.showCards();
        this.isStarted = true;
    }

    restart(){
        if (!this.isStarted) {
            return;
        }
        this.isStarted = false;
        let count = 0;
        let onCardMoveComplete = () => {
            count++;
            if (count >= this.cards.length) {
                this.start();
            }
        };
        this.cards.forEach(card => {
            card.move({
                x: config.width + card.width,
                y: config.height + card.height,
                delay: card.position.delay,
                callback: onCardMoveComplete,
            });
        });
    }

    initCards(){
        let positions = Phaser.Utils.Array.Shuffle(this.positions);

        this.cards.forEach(card => {
            card.init(positions.pop());
        })
    }

    showCards(){
        this.cards.forEach(card => {
            card.depth = card.position.delay;
            card.move({
                x: card.position.x,
                y: card.position.y,
                delay: card.position.delay,
            })
        });
    }

    createCards(){
        this.cards = [];
        for (let value of this.config.cards) {
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

        this.sounds.card.play();

        if(this.openedCard){
            if (this.openedCard.value === card.value) {
                this.sounds.success.play();
                this.openedCard = null;
                this.openedCardsCount++;
                this.streak++;
                this.mistake = false;
                switch(this.streak){
                    case 1: this.updateScore(50);
                    break;
                    case 2: this.updateScore(150);
                    break;
                    case 3: this.updateScore(500);
                    break;
                    case 4: this.updateScore(1500);
                    break;
                    case 5: this.updateScore(5000);
                    break;
                    case (this.streak > 5): this.updateScore(15000);
                }
            }
            else {
                this.openedCard.close();
                this.openedCard = card;
                this.streak = 0;
                this.mistake = true;
            }
        }
        else {
            this.openedCard = card;
        }
        card.open();

        if (this.openedCardsCount === this.cards.length/2) {
            if (this.currentLevel < this.maxLevel) {
                this.currentLevel++;
            }
            this.sounds.complete.play();
            this.restart();
            this.updateScore(100*this.currentLevel);
        }
    }

    initCardsPositions(){
        let positions = [];
        let gap = 2;
        let cardTexture = this.textures.get('card').getSourceImage();
        let cardWidth = cardTexture.width + gap;
        let cardHeight = cardTexture.height + gap;
        let offsetX = (config.width - cardWidth * this.config.cols) / 2 + cardWidth / 2;
        let offsetY = (config.height - cardHeight * this.config.rows) / 2 + cardHeight / 2;
    
        let counter = 0;
        for (let row = 0; row < this.config.rows; row++) {
            for (let col = 0; col < this.config.cols; col++) {
                counter++;
                positions.push({
                    x: offsetX + col * cardWidth,
                    y: offsetY + row * cardHeight,
                    delay: counter * 100,
                })
            }
        }
    
        this.positions = positions;
    }
}
