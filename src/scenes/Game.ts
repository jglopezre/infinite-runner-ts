import Phaser from "phaser";
import AnimationsKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Game extends Phaser.Scene {
  
  #background!: Phaser.GameObjects.TileSprite //using # instead of PRIVATE, for javascript private props

  constructor() {
    super('game')
  }

  create() {
    const width = this.scale.width
    const height = this.scale.height

    this.#background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)

    const mouse = this.physics.add.sprite(width * 0.5, height * 0.5, TextureKeys.RocketMouse)
      .play(AnimationsKeys.RocketMouseRun)

    const body = mouse.body as Phaser.Physics.Arcade.Body  //Type-Casting, important to styudy
    body.setCollideWorldBounds(true)

    body.setVelocityX(200)

    this.physics.world.setBounds(
      0, 0,
      Number.MAX_SAFE_INTEGER, height -30
    )

    this.cameras.main.startFollow(mouse)
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
  }

  update(t: number, dt:number) {
    this.#background.setTilePosition(this.cameras.main.scrollX)
  }
}