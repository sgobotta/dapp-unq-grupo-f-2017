import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { appRoutes } from "./app.routes";
import { Maps } from "./views/maps/maps";
import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [
    AppComponent,
    Maps
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDgWdwImS6x6HU_VymuYnEzDCaLKbH-Nks",
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
