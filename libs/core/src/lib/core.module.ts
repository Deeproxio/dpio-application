import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShellComponent } from './shell/shell.component';
import { AuthenticationService } from '../../../auth/src/lib/shared/authentication.service';
import { AuthenticationGuard } from '../../../auth/src/lib/shared/authentication.guard';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';
import { I18nService } from './i18n.service';
import { MaterialModule } from '@dpio-application/shared/src/lib/material.module';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';

export function createHttpService(
  backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService
) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [CommonModule, HttpModule, TranslateModule.forChild(), FlexLayoutModule, MaterialModule, RouterModule],
  declarations: [ShellComponent, LangSelectorComponent],
  exports: [ShellComponent, LangSelectorComponent],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    I18nService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
