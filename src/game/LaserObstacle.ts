import Phaser from "phaser"
import TextureKeys from "../consts/TextureKeys"

export default class LaserObstacle extends Phaser.GameObjects.Container {
  #top!: Phaser.GameObjects.Image
  #middle!: Phaser.GameObjects.Image
  #bottom!: Phaser.GameObjects.Image
  #body!: Phaser.Physics.Arcade.StaticBody
  #bodyWidth!: number
  #bodyHeight!: number

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    this.#top = scene.add.image(0, 0, TextureKeys.LaserEnd).setOrigin(0.5, 0)

    this.#middle = scene.add.image(0, this.#top.y + this.#top.displayHeight, TextureKeys.LaserMiddle).setOrigin(0.5, 0)
    this.#middle.setDisplaySize(this.#middle.width, 200)

    this.#bottom = scene.add.image(0, this.#top.displayHeight +  this.#middle.displayHeight, TextureKeys.LaserEnd)
      .setOrigin(0.5, 0)
      .setFlipY(true)
    
    this.add([this.#top, this.#middle, this.#bottom])
    
    scene.physics.add.existing(this, true)

    this.#body = this.body as Phaser.Physics.Arcade.StaticBody
    this.#bodyWidth = this.#top.displayWidth
    this.#bodyHeight = this.#top.displayHeight + this.#middle.displayHeight + this.#bottom.displayHeight

    this.#body.setSize(this.#bodyWidth * 0.3, this.#bodyHeight - 20)
    this.#body.setOffset(- this.#bodyWidth * 0.15, 20)

    this.#body.position.x = this.x + this.#body.offset.x
    this.#body.position.y = this.y
  }

}