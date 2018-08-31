/**
 * Game canvas
 * 
 * Entry page of the game.
 */

import { BaseScene } from './basescene';
import { SoundHelper } from '../helpers/soundhelper';
import __imagePause from '../assets/images/button_pause.png';
import __imageComplete from '../assets/images/button_right.png';
import __musicLevel from '../assets/music/levelsong.mp3';
import __soundBlop from '../assets/sounds/blop.mp3';

export class Canvas extends BaseScene {

  readonly DURATION: number = 5000;
  private countdown: number = 0;
  private countdownText!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'Canvas'
    });

    this.countdown = this.DURATION;
  }

  init(config: object) {
    let navstate = this.getNavigationState();
    this.data.values.level = navstate.currentLevel;
    this.countdown = this.DURATION;
  }

  preload(): void {
    this.load.image('pause', __imagePause);
    this.load.image('complete', __imageComplete);
    this.load.audio('levelsong', __musicLevel);
    this.load.audio('blop', __soundBlop);
  }

  create(): void {
    let text = [
      'Canvas', 
      'Here is the game-play'
    ];
    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    let dims = this.getScreenDimension();
    let margin = dims.width * 0.1;
    let btnsize = dims.width * 0.08;
    let btn = null;

    this.countdownText = this.add.text(dims.width / 2, dims.height / 2, "#", { fontSize: '72px', fill: '#fff' });

    btn = this.add.sprite(dims.width - margin, margin, 'pause') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Canvas, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.scene.start('Pause');
    }, this);

    btn = this.add.sprite(dims.width - margin, margin + btnsize + margin, 'complete') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Canvas, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.scene.start('Scores');
    }, this);

    let music = this.sound.add('levelsong');
    SoundHelper.playBackgroundMusic(music);
  }

  update(time: number, delta: number): void {
    this.countdown -= delta;
    this.countdownText.setText("Level " + this.data.values.level + "\n+" + this.countdown);
    if (this.countdown < 0) {
      this.countdown = this.DURATION;
      this.sound.play('blop', { loop: false });
      this.scene.start('Scores');
    }
  }
}


