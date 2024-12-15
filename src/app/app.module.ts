import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './Auth/user/user.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import {MatButtonModule} from '@angular/material/button'; 
import { MatToolbarModule } from '@angular/material/toolbar';  // Import MatToolbarModule here
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { RemediesComponent } from './remedies/remedies.component';
import { SliderComponent } from './slider/slider.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CartComponent } from './cart/cart.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HelthtipsComponent } from './helthtips/helthtips.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address/address.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { SkinComponent } from './category/skin/skin.component';
import { HairComponent } from './category/hair/hair.component';
import { BodyComponent } from './category/body/body.component';
import { ImmunityComponent } from './category/immunity/immunity.component';
import { DigestionComponent } from './category/digestion/digestion.component';

import { PopupComponent } from './popup/popup.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { UserloginComponent } from './auth/userlogin/userlogin.component';
import { PaysuccessfullComponent } from './paysuccessfull/paysuccessfull.component';
export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    
    RemediesComponent,
    SliderComponent,
    PrivacypolicyComponent,
    ContactusComponent,
    CartComponent,
    AboutusComponent,
    CancellationComponent,
    SkinComponent,
    HairComponent,
    BodyComponent,
    ImmunityComponent,
    DigestionComponent,
    PopupComponent,
    UserloginComponent,
    PaysuccessfullComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SignupComponent,
    MatButtonModule,
    MatToolbarModule,  
    MatIconModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatListModule,
    FormsModule,
    CommonModule,
    HttpClientModule, 
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7252"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    provideAnimationsAsync(),
    [AuthGuard]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
