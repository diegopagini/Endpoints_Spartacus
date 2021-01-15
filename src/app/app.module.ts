import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { translations, translationChunksConfig } from '@spartacus/assets';
import {
  B2cStorefrontModule,
  CheckoutConfig,
  IconModule,
} from '@spartacus/storefront';
import { ConfigModule, RoutingConfig } from '@spartacus/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreDevtoolsModule.instrument(),
    ConfigModule.withConfig({
      routing: {
        routes: {
          product: {
            paths: [
              'customproperty/:productCode/:prettyName',
              'buyMeThisAmazingPowerTool/:productCode/:name',
              'buyMeThisAmazingPowerTool/:productCode',
            ],
          },
        },
      },
    } as RoutingConfig),
    ConfigModule.withConfig({
      checkout: {
        guest: true,
      },
    } as CheckoutConfig),
    B2cStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl: 'https://spartacus-demo.eastus.cloudapp.azure.com:8443',
          prefix: '/occ/v2/',
          endpoints: {
            product: {
              details:
                'products/${productCode}?fields=averageRating,stock(DEFAULT),description,availableForPickup,code,url,price(DEFAULT),numberOfReviews,manufacturer,categories(FULL),priceRange,multidimensional,configuratorType,configurable,tags,images(FULL)',
            },
          },
        },
      },
      context: {
        currency: ['USD'],
        language: ['en', 'de', 'ja'],
        baseSite: ['powertools-spa'],
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },
      features: {
        level: '2.1',
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
