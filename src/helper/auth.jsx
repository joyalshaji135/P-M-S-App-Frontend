import { useSelector } from 'react-redux';
import { store } from '../redux/store';

export const getAuthToken = () => {
  const state = store.getState();
  return store.selectors.getAuthToken(state);
};

export const getCurrentUser = () => {
  const state = store.getState();
  return store.selectors.getCurrentUser(state); // Reuse existing selector
};

export const getLoggedUser =() => {
  const user = useSelector(store.selectors.getCurrentUser);
  return user;
}