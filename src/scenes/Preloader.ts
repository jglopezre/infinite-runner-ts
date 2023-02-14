import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationsKeys from "../consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor(){
    super(SceneKeys.Preloader)
  } 

  preload() {

    this.load.image(
      TextureKeys.Background,
      'house/bg_repeat_340x640.png'
    )
    this.load.spritesheet(
      TextureKeys.RocketMouse, 
      'mouse/rocket_mouse_spritesheet.png', 
      {
        frameWidth: 134,
        frameHeight: 126
       }
    )
    this.load.spritesheet(
      TextureKeys.RocketFire,
      'mouse/flame_sprite.png',
      {
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

    this.scene.start(SceneKeys.Game)
  }
}