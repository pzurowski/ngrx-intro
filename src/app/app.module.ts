import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppReduxModule} from './app.redux';
import {NamesListComponent} from './names-list.component';
import {NamesDescriptionComponent} from './names-description.component';
import {NamesCountComponent} from './names-count.component';

@NgModule({
  declarations: [
    AppComponent,
    NamesListComponent,
    NamesDescriptionComponent,
    NamesCountComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppReduxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
