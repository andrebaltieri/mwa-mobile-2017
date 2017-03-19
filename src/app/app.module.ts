import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { CartPage } from '../pages/cart/cart';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { UserService } from '../providers/user-service';
import { CartService } from '../providers/cart-service';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'f8b4ab7e',
  },
  'push': {
    'sender_id': '344163979429',
    'pluginConfig': {
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ProductDetailsPage,
    CartPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ProductDetailsPage,
    CartPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, UserService, CartService]
})
export class AppModule { }
