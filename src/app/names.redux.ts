import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {State} from './app.redux';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

export interface NamesState {
  data: string[];
  description: string;
}

export const initialState: NamesState = {
  data: [],
  description: '',
};

type AddName = { type: '[name] ADD_NAME', payload: string };
type RemoveName = { type: '[name] REMOVE_NAME', payload: number };
type ResetNames = { type: '[name] RESET' };
type SortNames = { type: '[name] SORT' };
type UpdatedDescription = { type: '[name] DESCRIPTION', payload: string };
type UpdateDescription = { type: '[name] FETCH DESCRIPTION' };
type UpdateDescriptionFail = { type: '[name] FETCH DESCRIPTION FAIL', payload: any };

type Action =
  AddName
  | ResetNames
  | RemoveName
  | SortNames
  | UpdatedDescription
  | UpdateDescription
  | UpdateDescriptionFail
  ;

export function namesReducer(state: NamesState = initialState, action: Action): NamesState {
  switch (action.type) {
    case '[name] ADD_NAME': {
      return {...state, data: [...state.data, action.payload]};
    }
    case '[name] RESET': {
      return initialState;
    }
    case '[name] REMOVE_NAME': {
      return {
        ...state,
        data: state.data.filter((item, index) => index !== action.payload)
      };
    }
    case '[name] SORT': {
      return {
        ...state,
        data: [...state.data].sort()
      };
    }
    case '[name] DESCRIPTION': {
      return {...state, description: action.payload}
    }
    default: {
      return state;
    }
  }
}

@Injectable()
export class NamesService {

  constructor(private store: Store<State>) {
  }

  add(payload: string): void {
    this.store.dispatch<Action>({type: '[name] ADD_NAME', payload});
  }

  fetchDescription(): void {
    this.store.dispatch<Action>({type: '[name] FETCH DESCRIPTION'});
  }

  remove(payload: number): void {
    this.store.dispatch<Action>({type: '[name] REMOVE_NAME', payload});
  }

  reset(): void {
    this.store.dispatch<Action>({type: '[name] RESET'});
  }

  sort(): void {
    this.store.dispatch<Action>({type: '[name] SORT'});
  }

  get names$(): Store<string[]> {
    return this.store.select(state => state.names.data);
  }

  get description$(): Store<string> {
    return this.store.select(state => state.names.description);
  }

}

@Injectable()
export class NamesEffects {

  @Effect() fetchDescription$ = this.actions$
    .ofType<UpdateDescription>('[name] FETCH DESCRIPTION')
    .switchMap(() => this.http.get('https://randomuser.me/api/')
      .map((response: any) => (
        {type: '[name] DESCRIPTION', payload: response.results[0].location.city}))
      .catch(err => Observable.of({type: '[name] FETCH DESCRIPTION FAIL', payload: err}))
    );

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }

}
