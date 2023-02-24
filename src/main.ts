import Phaser from 'phaser'
import './style.css'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'


const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    }
  },
  scene: [Preloader, Game, GameOver]

}

export default new Phaser.Game(config)