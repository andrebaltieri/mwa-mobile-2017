import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CartService } from '../../providers/cart-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  public items: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService, public alertCtrl: AlertController) {
    this.cartService.getItems();
    this.items = cartService.items;
  }

  ionViewDidLoad() {

  }

  checkout(){
    let prompt = this.alertCtrl.create({
      title: 'Checkout',
      message: "Seu pedido foi realizado com sucesso e será enviado em breve!",      
      buttons: [       
        {
          text: 'OK',
          handler: data => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    prompt.present();
  }

}
