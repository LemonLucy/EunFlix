// load wishlist from localstorage when app starts
import { createSlice } from '@reduxjs/toolkit';

const getWishlistIdsFromLocalStorage = (email) => {
  return JSON.parse(localStorage.getItem(`wishlist_ids_${email}`)) || [];
};

const getWishlistFromLocalStorage = (email) => {
  return JSON.parse(localStorage.getItem(`wishlist_${email}`)) || [];
};

const initialState = {
  wishlistIds: [],
  wishlist: [], // 전체 데이터, user email로 로드
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // 이메일 기반으로 위시리스트 로드
    loadWishlist: (state, action) => {
      const email = action.payload;
      state.wishlistIds = getWishlistIdsFromLocalStorage(email);
      state.wishlist = getWishlistFromLocalStorage(email); // 사용자 이메일로 위시리스트 불러오기
    },

    // 전체 위시리스트 동기화
    setWishlist: (state, action) => {
      const { email, wishlist } = action.payload;
      state.wishlist = wishlist;
      state.wishlistIds = wishlist.map(movie => movie.id); // ID 목록 업데이트
      localStorage.setItem(`wishlist_${email}`, JSON.stringify(state.wishlist)); // 전체 위시리스트 동기화
      localStorage.setItem(`wishlist_ids_${email}`, JSON.stringify(state.wishlistIds)); // ID 목록 동기화
    },

    // 특정 영화 추가
    addToWishlist: (state, action) => {
      const { email, movie } = action.payload;
      if (!state.wishlistIds.includes(movie.id)) {
        state.wishlistIds.push(movie.id);
        state.wishlist.push(movie);
        
        // 로컬 스토리지에 동기화
        localStorage.setItem(`wishlist_ids_${email}`, JSON.stringify(state.wishlistIds));
        localStorage.setItem(`wishlist_${email}`, JSON.stringify(state.wishlist));
      }
    },

    // 특정 영화 제거
    removeFromWishlist: (state, action) => {
      const { email, movieId } = action.payload;
      state.wishlistIds = state.wishlistIds.filter(id => id !== movieId);
      state.wishlist = state.wishlist.filter(movie => movie.id !== movieId);

      // 로컬 스토리지에 동기화
      localStorage.setItem(`wishlist_ids_${email}`, JSON.stringify(state.wishlistIds));
      localStorage.setItem(`wishlist_${email}`, JSON.stringify(state.wishlist));
    },
  },
});

export const { loadWishlist, setWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
