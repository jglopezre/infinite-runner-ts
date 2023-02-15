import Phaser from "phaser";
import AnimationsKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Game extends Phaser.Scene {

  /*using # instead of PRIVATE, for javascript private props*/

  #background!: Phaser.GameObjects.TileSprite 
  #mouseHole!: Phaser.GameObjects.Image
  #window1!: Phaser.GameObjects.Image
  #window2!: Phaser.GameObjects.Image
  #bookCase1!: Phaser.GameObjects.Image
  #bookCase2!: Phaser.GameObjects.Image
  #bookCases: Phaser.GameObjects.Image[] = []
  #windows: Phaser.GameObjects.Image[] = []

  constructor() {
    super('game')
  }

  #wrapMouseHole () {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    if(this.#mouseHole.x + this.#mouseHole.width < scrollX) {
      this.#mouseHole.x = Phaser.Math.Between(rightEdge + 100, rightEdge + 1000)
    }
  }

  #wrappWindows() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    let width = this.#window1.width * 2
    if(this.#window1.x + width < scrollX) {
      this.#window1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800 
      )
    }

    width = this.#window2.width
    if(this.#window2.x + width < scrollX) {
      this.#window2.x = Phaser.Math.Between(
        this.#window1.x + width,
        this.#window1.x + width + 800
      )
    }
  }

  #wrapBookCase() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    let width = this.#bookCase1.width * 2
    if(this.#bookCase1.x + width < scrollX){
      this.#bookCase1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800
      )
    }
    width = this.#bookCase2.width
    if(this.#bookCase2.x + width < scrollX){
      this.#bookCase2.x = Phaser.Math.Between(
        this.#bookCase1.x + width,
        this.#bookCase1.x + width + 800
      )
    }
  }

  create() {
    const width = this.scale.width
    const height = this.scale.height

    this.#background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)

    this.#mouseHole = this.add.image(Phaser.Math.Between(900, 1500), 501, TextureKeys.MouseHole)

    this.#window1 = this.add.image(Phaser.Math.Between(900, 1300), 200, TextureKeys.Window1)
    this.#window2 = this.add.image(Phaser.Math.Between(1600, 2000), 200, TextureKeys.Window2)

    this.#windows = [this.#window1, this.#window2]

    this.#bookCase1 = this.add.image(Phaser.Math.Between(2200, 2700), 580, TextureKeys.BookCase1)
      .setOrigin(0.5, 1)
    this.#bookCase2 = this.add.image(Phaser.Math.Between(2900, 3400), 580, TextureKeys.BookCase2)
      .setOrigin(0.5, 1)

    this.#bookCases = [this.#bookCase1, this.#bookCase2]
    
    const mouse = this.physics.add.sprite(width * 0.5, height - 30, TextureKeys.RocketMouse)
      .setOrigin(0.5, 1)
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
    this.#wrapMouseHole()
    this.#wrappWindows()
    this.#wrapBookCase()
  }
}