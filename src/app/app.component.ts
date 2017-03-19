import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { UserService } from '../providers/user-service';
import { CartService } from '../providers/cart-service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  public user: any;
  public items: any[] = [];

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ icon: string, title: string, component: any }>;

  constructor(
    public userService: UserService,
    public cartService: CartService,
    public platform: Platform) {
    this.initializeApp();

    this.pages = [
      { icon: 'lock', title: 'Login', component: LoginPage },
      { icon: 'home', title: 'Home', component: HomePage }
    ];

    this.userService.userChange.subscribe((data) => {
      this.user = this.userService.loadUser();
    });

    this.cartService.cartChange.subscribe((data) => {
      this.items = this.cartService.items;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  goToCart() {
    this.nav.setRoot(CartPage);
  }

  logout() {
    this.userService.logout();
    this.nav.setRoot(LoginPage);
  }
}
