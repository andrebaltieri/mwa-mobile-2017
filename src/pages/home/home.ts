import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding, ToastController, ModalController } from 'ionic-angular';

import { ProductDetailsPage } from '../product-details/product-details';
import { CartService } from '../../providers/cart-service';

import { Push, PushToken } from '@ionic/cloud-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items: any[] = [];
  public products: any[] = [];
  public token: string = '';

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public cartService: CartService,
    public push: Push) {

    this.cartService.cartChange.subscribe((data) => {
      this.items = this.cartService.items;
    });
  }

  ionViewDidLoad() {
    this.products.push({ id: 5788, title: 'Mouse', description: 'Mouse de alta performance para quem está buscando alto desempenho nos games!', image: 'http://placehold.it/128x128', price: 299.90 });
    this.products.push({ id: 5789, title: 'Teclado', description: ' ', image: 'http://placehold.it/128x128', price: 399.90 });
    this.products.push({ id: 5882, title: 'Monitor', description: ' ', image: 'http://placehold.it/128x128', price: 1499.90 });
    this.products.push({ id: 2314, title: 'Caixas Acústicas', description: '', image: 'http://placehold.it/128x128', price: 399.90 });
    this.products.push({ id: 5506, title: 'Mouse Pad', description: ' ', image: 'http://placehold.it/128x128', price: 29.90 });

    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      this.token = t.token;
      let toast = this.toastCtrl.create({
        message: t.token,
        duration: 1500
      });
      toast.present();
    }).catch((err) => {
      let toast = this.toastCtrl.create({
        message: 'Falha ao registrar o dispositivo',
        duration: 1500
      });
      toast.present();
    });

    this.push.rx.notification()
      .subscribe((msg) => {
        let toast = this.toastCtrl.create({
          message: msg.text,
          duration: 1500
        });
        toast.present();
      });
  }

  showDetails(product) {
    let modal = this.modalCtrl.create(ProductDetailsPage, { product: product });
    modal.present();
  }

  addToCart(slidingItem: ItemSliding, product: any) {
    this.cartService.addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1
    });

    slidingItem.close();
    let toast = this.toastCtrl.create({
      message: 'Produto adicionado ao carrinho!',
      duration: 1500
    });
    toast.present();
  }
}
