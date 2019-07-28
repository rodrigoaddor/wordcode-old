import { Action } from 'redux';

interface PayloadedAction<Type, Payload> extends Action<Type> {
  payload: Payload
}

export { PayloadedAction }
