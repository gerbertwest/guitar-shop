import {PayloadAction} from '@reduxjs/toolkit';
import {Middleware} from 'redux';
import {reducer} from '../reducer';
import { REDIRECT_ACTION_NAME } from '../../const';
import browserHistory from '../../types/browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === REDIRECT_ACTION_NAME) {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
