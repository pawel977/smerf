import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './main/main.component';
import { DrinkComponent } from './drink-game/components/drink/drink.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { InitGameByNameComponent } from './drink-game/modals/init-game-by-name/init-game-by-name.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GameComponent } from './drink-game/components/game/game.component';
import { PlayerCardComponent } from './drink-game/components/player-card/player-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AddPlayerComponent } from './drink-game/modals/add-player/add-player.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { ExistingGameListComponent } from './drink-game/modals/existing-game-list/existing-game-list.component';
import { EditPlayerComponent } from './drink-game/modals/edit-player/edit-player.component';
import { EditImageLinkComponent } from './drink-game/modals/edit-image-link/edit-image-link.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RemovePlayerComponent } from './drink-game/modals/remove-player/remove-player.component';
import { GlobalErrorHandlerInterceptor } from './shared/global-error-handler.interceptor';
import { ButtonTableMainComponent } from './drink-game/components/button-table-main/button-table-main.component';
import { QueueListComponent } from './drink-game/components/queue-list/queue-list.component';
import { QueuePlayerItemComponent } from './drink-game/components/queue-player-item/queue-player-item.component';
import { ConfigComponent } from './drink-game/modals/config/config.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DrinkComponent,
    InitGameByNameComponent,
    GameComponent,
    PlayerCardComponent,
    AddPlayerComponent,
    ExistingGameListComponent,
    EditPlayerComponent,
    EditImageLinkComponent,
    RemovePlayerComponent,
    ButtonTableMainComponent,
    QueueListComponent,
    QueuePlayerItemComponent,
    ConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    FormsModule,
    MatDialogModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
