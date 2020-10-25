/**
 * Pre-loader with progress bar
 * 
 * Entry page of the game.
 */

import { Asset, Assets } from '~/assets/assets';
import { BaseScene } from '~/scenes/basescene';
import { PercentageBar } from '~/widgets/percentagebar';

export class Loader extends BaseScene {

  private __loadCompleted = false;

  private __progressBar: PercentageBar;

  constructor() {
    super({
      key: 'Loader'
    });

    this.__progressBar = new PercentageBar(this);
  }

  init(): void {
    this.attachDefaultHandlers();
  }

  preload(): void {
    if (!this.__loadCompleted) {
      this.__progressBar.create(
        this.cameras.main.centerX - 350,
        this.cameras.main.centerY - 25,
        700,
        50);

      this.load.on('progress', this.onLoadProgress.bind(this));
      this.load.on('complete', this.onLoadCompleted.bind(this));

      Assets.getInstance().forEach(this.loadAsset.bind(this));
    }
  }

  update() {
    this.transitionToWelcome();
  }

  onShutdown() {
    this.detachDefaultHandlers();
  }

  transitionToWelcome(): void {
    this.scene.start('Welcome');
  }

  private onLoadProgress(value: number) {
    this.__progressBar.setValue(value);
  }

  private onLoadCompleted() {
    this.__loadCompleted = true;
    this.__progressBar.destroy();
  }

  private loadAsset(asset: Asset, key: string, map: Assets) {
    if (asset.kind == "image") {
      this.load.image(key, asset.url);
    } else if (asset.kind == "music") {
      this.load.audio(key, asset.url);
    } else if (asset.kind == "sound") {
      this.load.audio(key, asset.url);
    } else if (asset.kind == "spine") {
      // spine assets load the spritesheets implicitly, which is why
      // the loader needs to know the base location og the spritesheet
      this.load.setPath(asset.url);
      // and since the parcel bundler does not handle paths in atlas files, 
      // the bundled files cannot be used for loading atlas. this could
      // be fixed later via parcel plugin that provied apine support.
      // insted, for now, the file names generated by parcel are
      // reversed to the original names, so that they can be loaded
      // from the static folder instead. RRR
      let base = (asset.url2 ? asset.url2 : '').split('.').shift();
      let skeleton: string = base + '.skeleton';
      let atlas: string = base + '.atlas';

      // @ts-ignore
      this.load.spine(key, skeleton, atlas);
      //this.load.setPath(path);
    } else {
      throw new Error("Unhandled asset type " + asset.kind + " from " + asset.url);
    }
  }
}
