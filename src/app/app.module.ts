import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule } from '@spartacus/storefront';
import { ConfigModule, RoutingConfig } from '@spartacus/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ConfigModule.withConfig({
      routing: {
        routes: {
          product: {
            paths: [
              'customproperty/:productCode/:prettyName',
              'buymethisamazingpowertool/:productCode/:name/',
            ],
          },
        },
      },
    } as RoutingConfig),
    B2cStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl: 'https://spartacus-demo.eastus.cloudapp.azure.com:8443',
          prefix: '/occ/v2/',
          endpoints: {
            // product: 'products/${productCode}?fields=DEFAULT,customAttribute',
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
