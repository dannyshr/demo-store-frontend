// src/store/index.js

import { createStore, combineReducers } from 'redux';

// --- Actions for first screen ---
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const SET_PRODUCT_NAME = 'SET_PRODUCT_NAME';
export const SET_PRODUCT_QUANTITY = 'SET_PRODUCT_QUANTITY';
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

// --- Actions for second screen ---
export const SET_FULL_NAME = 'SET_FULL_NAME';
export const SET_FULL_ADDRESS = 'SET_FULL_ADDRESS';
export const SET_EMAIL = 'SET_EMAIL';
export const RESET_ORDER_FORM = 'RESET_ORDER_FORM'; // To clear the form after submission or navigation

// --- Action Creators for the first screen ---
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

export const updateCartItemQuantity = (category, itemName, newQuantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { category, itemName, newQuantity },
});

export const removeCartItem = (category, itemName) => ({
  type: REMOVE_CART_ITEM,
  payload: { category, itemName },
});

// --- Action Creators for the second screen ---
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

// --- Redux Reducers ---
const initialProductsState = {
  categories: [],
  selectedCategory: '',
  productName: '',
  productQuantity: 1,
  cart: {},
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
      const updatedCartAdd = { ...state.cart };

      if (!updatedCartAdd[category]) {
        updatedCartAdd[category] = [];
      }

      const existingItemIndexAdd = updatedCartAdd[category].findIndex(
        (item) => item.name === name
      );

      if (existingItemIndexAdd > -1) {
        updatedCartAdd[category][existingItemIndexAdd].quantity += quantity;
      } else {
        updatedCartAdd[category].push({ name, quantity });
      }

      return { ...state, cart: updatedCartAdd };
    case CLEAR_CART:
      return { ...state, cart: {} };

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
    case UPDATE_CART_ITEM_QUANTITY:
      const { category: updateCategory, itemName: updateItemName, newQuantity } = action.payload;
      const updatedCartQuantity = { ...state.cart };

      if (updatedCartQuantity[updateCategory]) {
        const itemIndex = updatedCartQuantity[updateCategory].findIndex(item => item.name === updateItemName);
        if (itemIndex > -1) {
          if (newQuantity <= 0) {
            // If new quantity is 0 or less, remove the item
            updatedCartQuantity[updateCategory].splice(itemIndex, 1);
            if (updatedCartQuantity[updateCategory].length === 0) {
              delete updatedCartQuantity[updateCategory]; // Remove category if no items left
            }
          } 
          else {
            // Otherwise, update the quantity
            updatedCartQuantity[updateCategory][itemIndex].quantity = newQuantity;
          }
        }
      }
      return { ...state, cart: updatedCartQuantity };
    case REMOVE_CART_ITEM:
      const { category: removeCategory, itemName: removeItemName } = action.payload;
      const updatedCartRemove = { ...state.cart };

      if (updatedCartRemove[removeCategory]) {
        updatedCartRemove[removeCategory] = updatedCartRemove[removeCategory].filter(item => item.name !== removeItemName);
        if (updatedCartRemove[removeCategory].length === 0) {
          delete updatedCartRemove[removeCategory]; // Remove category if no items left
        }
      }
      return { ...state, cart: updatedCartRemove };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

export default store;
