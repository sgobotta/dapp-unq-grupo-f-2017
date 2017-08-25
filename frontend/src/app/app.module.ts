import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { appRoutes } from "./app.routes";
import { Maps } from "./views/maps/maps";

@NgModule({
  declarations: [
    AppComponent,
    Maps
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
