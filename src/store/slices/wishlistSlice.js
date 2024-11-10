// load wishlist from localstorage when app starts
import { createSlice } from '@reduxjs/toolkit';

const getWishlistFromLocalStorage = (email) => {
  return JSON.parse(localStorage.getItem(`wishlist_${email}`)) || [];
};

const initialState = {
  wishlist: [], // Default empty, will be loaded based on user email
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    loadWishlist: (state, action) => {
      const email = action.payload;
      state.wishlist = getWishlistFromLocalStorage(email); // Load wishlist for the specific email
    },
    setWishlist: (state, action) => {
      const { email, wishlist } = action.payload;
      state.wishlist = wishlist;
      localStorage.setItem(`wishlist_${email}`, JSON.stringify(state.wishlist)); // Sync with localStorage
    },
    addToWishlist: (state, action) => {
      const { email, movie } = action.payload;
      state.wishlist.push(movie);
      localStorage.setItem(`wishlist_${email}`, JSON.stringify(state.wishlist)); // Update localStorage for the specific email
    },
    removeFromWishlist: (state, action) => {
      const { email, movieId } = action.payload;
      state.wishlist = state.wishlist.filter((movie) => movie.id !== movieId);
      localStorage.setItem(`wishlist_${email}`, JSON.stringify(state.wishlist)); // Update localStorage for the specific email
    },
  },
});

export const { loadWishlist, setWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
