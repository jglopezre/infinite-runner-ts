import Phaser, { Scene } from "phaser"
import AnimationsKeys from "../consts/AnimationKeys"
import SceneKeys from "../consts/SceneKeys"
import TextureKeys from "../consts/TextureKeys"

enum MouseState {
  Running,
  Killed,
  Dead
}

export default class RocketMouse extends Phaser.GameObjects.Container {

  #mouseState = MouseState.Running
  #flames!: Phaser.GameObjects.Sprite
  #cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  #mouse!: Phaser.GameObjects.Sprite
  #isDead: boolean = false

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    this.#mouse = scene.add.sprite(0, 0, TextureKeys.RocketFire)
      .setOrigin(0.5, 1)
      .play(AnimationsKeys.RocketMouseRun)
    
    this.#flames = scene.add.sprite(-63, -15, TextureKeys.RocketMouse)
      .play(AnimationsKeys.RocketFlameOn)

    this.enableJetPack(false)

    this.add(this.#flames)
    this.add(this.#mouse)
    
    scene.physics.add.existing(this)

    const body = this.body as Phaser.Physics.Arcade.Body
    body.setSize(this.#mouse.width * 0.5, this.#mouse.height * 0.7)
    body.setOffset(this.#mouse.width * -0.3, -this.#mouse.height + 15)

    this.#cursors = scene.input.keyboard.createCursorKeys()
  }

  enableJetPack(enable: boolean = true) {
    this.#flames.setVisible(enable)
  }

  kill() {
      if(this.#mouseState !== MouseState.Running) {
        return
      }

    this.#mouse.play(AnimationsKeys.RocketMouseDeath)

    const body = this.body as Phaser.Physics.Arcade.Body
    body.setAccelerationY(0)
    body.setVelocity(600, 0)
    this.enableJetPack(false)
    this.#mouseState = MouseState.Killed

  }

  
  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body

    switch (this.#mouseState) {
      case MouseState.Running: {

        if(this.#cursors.space?.isDown) {
          body.setAccelerationY(-800)
          this.enableJetPack(true)
          this.#mouse.play(AnimationsKeys.RocketMouseFly, true)

        } else {
          body.setAccelerationY(400)
          this.enableJetPack(false)

        }
        if(body.blocked.down) {
          this.#mouse.play(AnimationsKeys.RocketMouseRun, true)
        } else if (body.velocity.y > 0) {
          this.#mouse.play(AnimationsKeys.RocketMouseFall, true)
        }
        break
      }

      case MouseState.Killed: {
        body.velocity.x *= 0.97
        
        if (body.velocity.x <= 5) {
          this.#mouseState = MouseState.Dead
        }
        break
      }

      case MouseState.Dead: {
        body.setVelocity(0, 0)

        //TODO put this function in other module using Paser.Events.EventEmitter
        
        if(!this.scene.scene.isActive(SceneKeys.GameOver) && !this.#isDead){
          this.scene.scene.run(SceneKeys.GameOver)
          this.#isDead = true
        }
        
        break
      }
    }
  }
}