import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationsKeys from "../consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor(){
    super(SceneKeys.Preloader)
  } 

  preload() {

    this.load.image(TextureKeys.Background, 'house/bg_repeat_340x640.png')
    this.load.image(TextureKeys.MouseHole, 'house/object_mousehole.png')
    this.load.image(TextureKeys.Window1, 'house/object_window1.png')
    this.load.image(TextureKeys.Window2, 'house/object_window2.png')
    this.load.image(TextureKeys.BookCase1, 'house/object_bookcase1.png')
    this.load.image(TextureKeys.BookCase2, 'house/object_bookcase2.png')
    this.load.image(TextureKeys.LaserMiddle, 'house/object_laser.png')
    this.load.image(TextureKeys.LaserEnd, 'house/object_laser_end.png')
    this.load.image(TextureKeys.Coin, 'house/object_coin.png')

    this.load.spritesheet(TextureKeys.RocketMouse, 'mouse/rocket_mouse_spritesheet.png', {
        frameWidth: 134,
        frameHeight: 126
       }
    )

    this.load.spritesheet(TextureKeys.RocketFire, 'mouse/flame_sprite.png', {
        frameWidth: 44,
        frameHeight: 64
      }
    )
  }

  create() {
    this.anims.create({
      key: AnimationsKeys.RocketMouseRun,
      frames: this.anims.generateFrameNumbers(TextureKeys.RocketMouse, { start: 0, end: 3}),
      frameRate: 8,
      repeat: -1
    })

    this.anims.create({
      key: AnimationsKeys.RocketFlameOn,
      frames: this.anims.generateFrameNumbers(TextureKeys.RocketFire , {start: 0, end: 1}),
      frameRate:10,
      repeat: -1
    })

    this.anims.create({
      key: AnimationsKeys.RocketMouseFly,
      frames:[{
        key: TextureKeys.RocketMouse,
        frame: 4
      }]
    })

    this.anims.create({
      key: AnimationsKeys.RocketMouseFall,
      frames:[{
        key: TextureKeys.RocketMouse,
        frame: 5
      }]
    })

    this.anims.create({
      key: AnimationsKeys.RocketMouseDeath,
      frames: this.anims.generateFrameNumbers(TextureKeys.RocketMouse, {start: 6, end: 7}),
      frameRate: 10,
    })

    this.scene.start(SceneKeys.Game)
  }
}