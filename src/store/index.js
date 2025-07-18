// src/store/index.js

import { createStore, combineReducers } from 'redux';

// --- Redux Actions ---
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const SET_PRODUCT_NAME = 'SET_PRODUCT_NAME';
export const SET_PRODUCT_QUANTITY = 'SET_PRODUCT_QUANTITY';
export const ADD_TO_CART = 'ADD_TO_CART';
export const CLEAR_CART = 'CLEAR_CART';

// --- New Actions for Second Screen ---
export const SET_FULL_NAME = 'SET_FULL_NAME';
export const SET_FULL_ADDRESS = 'SET_FULL_ADDRESS';
export const SET_EMAIL = 'SET_EMAIL';
export const RESET_ORDER_FORM = 'RESET_ORDER_FORM'; // To clear the form after submission or navigation

// --- New Action Creators ---
export const setFullName = (name) => ({
  type: SET_FULL_NAME,
  payload: name,
});

export const setFullAddress = (address) => ({
  type: SET_FULL_ADDRESS,
  payload: address,
});

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const resetOrderForm = () => ({
  type: RESET_ORDER_FORM,
});

// --- Existing Action Creators (for context, ensure they are still there) ---
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setSelectedCategory = (category) => ({
  type: SET_SELECTED_CATEGORY,
  payload: category,
});

export const setProductName = (name) => ({
  type: SET_PRODUCT_NAME,
  payload: name,
});

export const setProductQuantity = (quantity) => ({
  type: SET_PRODUCT_QUANTITY,
  payload: quantity,
});

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

// --- Redux Reducers ---
const initialProductsState = {
  categories: [],
  selectedCategory: '',
  productName: '',
  productQuantity: 1,
  cart: {},
  // --- New State for Second Screen ---
  fullName: '',
  fullAddress: '',
  email: '',
};

const productsReducer = (state = initialProductsState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload };
    case SET_PRODUCT_NAME:
      return { ...state, productName: action.payload };
    case SET_PRODUCT_QUANTITY:
      return { ...state, productQuantity: action.payload };
    case ADD_TO_CART:
      const { category, name, quantity } = action.payload;
      const updatedCart = { ...state.cart };

      if (!updatedCart[category]) {
        updatedCart[category] = [];
      }

      const existingItemIndex = updatedCart[category].findIndex(
        (item) => item.name === name
      );

      if (existingItemIndex > -1) {
        updatedCart[category][existingItemIndex].quantity += quantity;
      } else {
        updatedCart[category].push({ name, quantity });
      }

      return { ...state, cart: updatedCart };
    case CLEAR_CART:
      return { ...state, cart: {} };

    // --- New Reducer Cases for Second Screen ---
    case SET_FULL_NAME:
      return { ...state, fullName: action.payload };
    case SET_FULL_ADDRESS:
      return { ...state, fullAddress: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case RESET_ORDER_FORM:
      return {
        ...state,
        fullName: '',
        fullAddress: '',
        email: '',
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

export default store;
