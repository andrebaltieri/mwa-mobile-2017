import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html'
})
export class ProductDetailsPage {
  public product: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.product = this.navParams.get('product');
  }

  ionViewDidLoad() {

  }

  close() {
    this.viewCtrl.dismiss();
  }
}
