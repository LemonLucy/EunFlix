import { useState, useEffect } from 'react';

const useWishlist = (email) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    if (email) {
      // 로컬 스토리지에서 위시리스트 가져오기
      const savedData = localStorage.getItem(`wishlist_${email}`);
      const savedIds = localStorage.getItem(`wishlist_ids_${email}`);
      try {
        const parsedData = savedData ? JSON.parse(savedData) : [];
        const parsedIds = savedIds ? JSON.parse(savedIds) : [];
        if (Array.isArray(parsedData)) {
          setWishlist(parsedData);
          setWishlistIds(parsedIds);
        } else {
          console.warn("Wishlist data is not an array. Resetting to empty array.");
          setWishlist([]);
          setWishlistIds([]);
        }
      } catch (error) {
        console.error("Error parsing wishlist data:", error);
        setWishlist([]);
        setWishlistIds([]);
      }
    }
  }, [email]);

  // 위시리스트에 영화 추가/제거
  const toggleWishlist = (movie) => {
    if (!email) {
      console.warn("Cannot toggle wishlist as email is undefined");
      return;
    }

    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      const updatedWishlist = exists
        ? prev.filter((item) => item.id !== movie.id)
        : [...prev, { ...movie }];

        setWishlistIds((prevIds) => {
          const updatedIds = exists
            ? prevIds.filter(id => id !== movie.id)
            : [...prevIds, movie.id];

          // 로컬 스토리지 업데이트 (변경사항 있을 때만)
          if (updatedWishlist.length !== prev.length) {
            localStorage.setItem(`wishlist_${email}`, JSON.stringify(updatedWishlist));
            localStorage.setItem(`wishlist_ids_${email}`, JSON.stringify(updatedIds));
          }
          return updatedIds;
        });

      return updatedWishlist;
    });
  };

  return [wishlist,wishlistIds, toggleWishlist];
};

export default useWishlist;
