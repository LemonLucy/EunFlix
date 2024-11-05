// load wishlist from localstorage when app starts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist)); // Sync with localStorage
    },
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((movie) => movie.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
