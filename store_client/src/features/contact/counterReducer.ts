export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 43,
  title: "nawa for you eh",
};
export function increment(amount = 1){
    return {
        type: INCREMENT_COUNT,
        payload: amount,
    }
}

export function decrement(amount= 1){
    return {
        type: DECREMENT_COUNT,
        payload: amount,
    }
}
export const INCREMENT_COUNT = "INCREMENT_COUNT";
export const DECREMENT_COUNT = "DECREMENT_COUNT";

export default function counterReducer(state = initialState, action: any) {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        data: state.data + action.payload,
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        data: state.data - action.payload,
      };
    default:
      return state;
  }
}
