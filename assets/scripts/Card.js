class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value, position){
        super(scene, position.x, position.y, `card${value}`);
        this.scene = scene;
        this.value = value;
        this.setOrigin(0);
        this.scene.add.existing(this);
    }
}