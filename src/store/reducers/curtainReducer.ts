import actions from '../actions'

const initialState = {
  value: 100,
}

export const curtainReducer = function(state = initialState, action: { type: string; value: unknown }) {
  switch (action.type) {
  case actions.DRAW_CURTAIN:
    return { ...state, value: -initialState.value }
  case actions.RESET_CURTAIN:
    return { ...state, value: initialState.value }
  default:
    return state
  }
}
