import {NgModule} from '@angular/core';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../environments/environment';
import {NamesEffects, namesReducer, NamesService, NamesState} from './names.redux';

export interface State {
  names: NamesState;
}

const reducers: ActionReducerMap<State> = {
  names: namesReducer,
};

const effects = [
  NamesEffects,
];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers: environment.production ? [] : [storeFreeze]}),
    environment.production ? [] : StoreDevtoolsModule.instrument({maxAge: 25}),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    NamesService,
  ]
})
export class AppReduxModule {

}