import Phaser from "phaser";
import AnimationsKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";
import LaserObstacle from "../game/LaserObstacle";
import RocketMouse from "../game/RocketMouse";

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
  #laserObstacle!: LaserObstacle

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

      const overlap = this.#bookCases.find(bookCase => {
        return Math.abs(this.#window1.x - bookCase.x) <= this.#window1.width
      })

      this.#window1.visible = !overlap
    }

    width = this.#window2.width
    if(this.#window2.x + width < scrollX) {
      this.#window2.x = Phaser.Math.Between(
        this.#window1.x + width,
        this.#window1.x + width + 800
      )

      const overlap = this.#bookCases.find(bookCase => {
        return Math.abs(this.#window2.x - bookCase.x) <= this.#window2.width
      })

      this.#window2.visible = !overlap
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

      const overlap = this.#windows.find(window => {
        return Math.abs(this.#bookCase1.x - window.x) <= window.width
      })

      this.#bookCase1.visible = !overlap
    }

    width = this.#bookCase2.width
    if(this.#bookCase2.x + width < scrollX){
      this.#bookCase2.x = Phaser.Math.Between(
        this.#bookCase1.x + width,
        this.#bookCase1.x + width + 800
      )

      const overlap = this.#windows.find(window => {
        return Math.abs(this.#bookCase2.x - window.x) <= window.width
      })

      this.#bookCase2.visible = !overlap
    }
  }

  #wrapLaserObstacle() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    const body = this.#laserObstacle.body as Phaser.Physics.Arcade.StaticBody

    const width = this.#laserObstacle.width
    if(this.#laserObstacle.x + width < scrollX) {
      this.#laserObstacle.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 1000
      )
      this.#laserObstacle.y = Phaser.Math.Between(0, 300)

      body.position.x = this.#laserObstacle.x + body.offset.x
      body.position.y = this.#laserObstacle.y
    }
  }

  #handleOverlapLaser(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
    console.log('overlap')
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

    this.#laserObstacle = new LaserObstacle(this, 900, 100)
    this.add.existing(this.#laserObstacle)
    
    const mouse = new RocketMouse(this, width * 0.5, height - 30)
    this.add.existing(mouse)

    const body = mouse.body as Phaser.Physics.Arcade.Body  //Type-Casting, important to styudy
    body.setCollideWorldBounds(true)
    body.setVelocityX(200)

    this.physics.world.setBounds(
      0, 0,
      Number.MAX_SAFE_INTEGER, height -30
    )

    this.cameras.main.startFollow(mouse)
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)

    this.physics.add.overlap(
      this.#laserObstacle,
      mouse,
      this.#handleOverlapLaser(), //TODO This requires attention
      undefined,
      this
    )
  }

  update(t: number, dt:number) {
    this.#background.setTilePosition(this.cameras.main.scrollX)
    this.#wrapMouseHole()
    this.#wrappWindows()
    this.#wrapBookCase()
    this.#wrapLaserObstacle()
  }
}