import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@dpio-application/core/src/lib/i18n.service';
import { CallbackComponent } from './callback/callback.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent, data: { title: extract('Login') } },
      { path: 'callback', component: CallbackComponent }
    ] as Routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}