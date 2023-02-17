import Phaser from "phaser"
import AnimationsKeys from "../consts/AnimationKeys"
import TextureKeys from "../consts/TextureKeys"

export default class RocketMouse extends Phaser.GameObjects.Container {

  #flames!: Phaser.GameObjects.Sprite
  #cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    const mouse = scene.add.sprite(0, 0, TextureKeys.RocketFire)
      .setOrigin(0.5, 1)
      .play(AnimationsKeys.RocketMouseRun)
    
    this.#flames = scene.add.sprite(-63, -15, TextureKeys.RocketMouse)
      .play(AnimationsKeys.RocketFlameOn)

    this.enableJetPack(false)

    this.add(this.#flames)
    this.add(mouse)
    
    scene.physics.add.existing(this)

    const body = this.body as Phaser.Physics.Arcade.Body
    body.setSize(mouse.width, mouse.height)
    body.setOffset(mouse.width * -0.5, -mouse.height)

    this.#cursors = scene.input.keyboard.createCursorKeys()
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body

    if(this.#cursors.space?.isDown) {
      body.setAccelerationY(-800)
      this.enableJetPack(true)
    } else {
      body.setAccelerationY(400)
      this.enableJetPack(false)
    }
  }

  enableJetPack(enable: boolean = true) {
    this.#flames.setVisible(enable)
  }
}