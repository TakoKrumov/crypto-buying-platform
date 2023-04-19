import { configureStore } from '@reduxjs/toolkit';
import priceReducer from './slices/priceSlice';

const storeGlobalCoins = configureStore({
  reducer: {
    prices: priceReducer,
  },
});

export default storeGlobalCoins;
