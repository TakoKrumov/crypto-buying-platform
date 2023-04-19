import { createSlice } from '@reduxjs/toolkit';

const priceSlice = createSlice({
  name: 'prices',
  initialState: {},
  reducers: {
    updatePrice: (state, action) => {
      const { symbol, price } = action.payload;
      state[symbol] = price;
    },
  },
});

export const { updatePrice } = priceSlice.actions;


export default priceSlice.reducer;
