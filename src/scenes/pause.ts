/**
 * Pause Screen
 * 
 * This page is displayed when the game is paused.
 */

import { BaseScene } from './basescene';
import __imageQuit from '../assets/images/button_left.png';
import __imageRetry from '../assets/images/button_retry.png';
import __imageResume from '../assets/images/button_right.png';
import __imagePause from '../assets/images/pause.png';

export class Pause extends BaseScene {
  
  constructor() {
    super({
      key: 'Pause'
    });
  }

  preload(): void {
    this.load.image('quit', __imageQuit);
    this.load.image('retry', __imageRetry);
    this.load.image('resume', __imageResume);
    this.load.image('pause', __imagePause);
  }

  create(): void {
    this.configureStandardEvents();

    let text = [
      'Pause', 
      'The game is paused'
    ];
    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    this.add.sprite(400, 300, 'pause') as Phaser.GameObjects.Sprite;

    let btn = null;

    btn = this.add.sprite(200, 150, 'quit') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(50, 50);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Pause, pointer: string | symbol) {
      this.scene.start('Menu');
    }, this);

    btn = this.add.sprite(400, 150, 'retry') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(50, 50);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Pause, pointer: string | symbol) {
      this.scene.start('Canvas');
    }, this);

    btn = this.add.sprite(600, 150, 'resume') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(50, 50);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Pause, pointer: string | symbol) {
      this.scene.start('Canvas');
    }, this);
  }

  update(delta: number): void {
  }

  configureStandardEvents(): void {
    this.input.keyboard.on('keydown', function(this: Pause, e: KeyboardEvent) {
      if (e.key == 'Enter') {
        this.scene.start('Canvas'); // next
      } else if (e.key == 'r') {
        this.scene.start('Canvas'); // retry
      } else if (e.key == 'Escape') {
        this.scene.start('Menu');
      } 
    }, this);
  }  
}


