export function reducer(state, action) {
  switch (action.type) {

    case 'MASK_USER_NAME':
      console.log('existing product: ' + JSON.stringify(state));
      console.log('payload: ' + action.payload);

      return {
        ...state,
        showProductCode: action.payload
      };
    default:
      return state;
  }
}
