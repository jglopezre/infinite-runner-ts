import Phaser from "phaser";
import AnimationsKeys from "../consts/AnimationKeys";



export default class Game extends Phaser.Scene {
  BACKGROUND = 'background'
  
  constructor() {
    super('game')
  }

  create() {
    

    const width = this.scale.width
    const height = this.scale.height

    this.add.tileSprite(0, 0, width, height, this.BACKGROUND).setOrigin(0)

    this.physics.add.sprite(width * 0.5, height * 0.5, 'player').play(AnimationsKeys.RocketMouseRun)
  }
}