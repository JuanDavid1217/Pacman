import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AudioComponent } from './audio/audio.component';
import { GhostComponent } from './ghost/ghost.component';

@NgModule({
  declarations: [
    AppComponent,
    AudioComponent,
    GhostComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
