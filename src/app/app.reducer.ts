//reducer global de la aplicacion 
import { ActionReducerMap } from '@ngrx/store';
import * as ui  from '../app/dashboard/shared/ui.reducer';
import * as auth  from '../app/auth/auth.reducer';


export interface AppState {
   ui: ui.State,
   user: auth.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer
}