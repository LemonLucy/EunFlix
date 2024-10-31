import { useState } from 'react';

function useLocalStorage(key) {
  // 로컬 스토리지에서 초기값을 가져오거나 기본값을 설정
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error("Error getting item from localStorage", error);
    }
  });

  // set 메서드: 로컬 스토리지에 데이터 저장
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting item in localStorage", error);
    }
  };

  // get 메서드: 로컬 스토리지에서 데이터 가져오기
  const getValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting item from localStorage", error);
      return null;
    }
  };

  // remove 메서드: 로컬 스토리지에서 데이터 삭제
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from localStorage", error);
    }
  };

  return [storedValue, setValue, getValue, removeValue];
}

export default useLocalStorage;
