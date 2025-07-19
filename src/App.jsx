// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  setCategories,
  setSelectedCategory,
  setProductName,
  setProductQuantity,
  addToCart,
  setFullName,
  setFullAddress,
  setEmail,
  resetOrderForm,
  clearCart,
} from './store';

// --- Access environment variables ---
// Destructure the environment variables directly
const {
  VITE_BACKEND_PRODUCT_API_URL,
  VITE_BACKEND_ORDER_API_URL, // Assuming you'll add this for the order service
  VITE_MAX_PRODUCT_QUANTITY // Example for a third variable
} = import.meta.env;
const BACKEND_PRODUCT_API_URL = VITE_BACKEND_PRODUCT_API_URL;
const BACKEND_ORDER_API_URL = VITE_BACKEND_ORDER_API_URL;
const MAX_PRODUCT_QUANTITY = parseInt(VITE_MAX_PRODUCT_QUANTITY) || 10;

// console.log('--- Debugging Environment Variables ---');
// console.log('VITE_BACKEND_PRODUCT_API_URL value:', VITE_BACKEND_PRODUCT_API_URL);
// console.log('VITE_BACKEND_ORDER_API_URL value:', VITE_BACKEND_ORDER_API_URL);
// console.log('VITE_MAX_PRODUCT_QUANTITY value:', VITE_MAX_PRODUCT_QUANTITY);
// console.log('BACKEND_PRODUCT_API_URL value:', BACKEND_PRODUCT_API_URL);
// console.log('BACKEND_ORDER_API_URL value:', BACKEND_ORDER_API_URL);
// console.log('MAX_PRODUCT_QUANTITY value:', MAX_PRODUCT_QUANTITY);
// console.log('--- End Debugging ---');

// --- React Components ---

// Category Dropdown Component
const CategoryDropdown = () => {
  const { t, i18n } = useTranslation();
  const categories = useSelector((state) => state.products.categories);
  const selectedCategoryName = useSelector((state) => state.products.selectedCategory);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-end w-full max-w-xs md:max-w-md lg:max-w-lg">
      <label htmlFor="category-select" className={`relative w-full ${t('textAlignVal')} text-gray-700 mb-1`}>
        {t('selectCategory')}
      </label>
      <div className="relative w-full">
        <select
          id="category-select"
          className={`block w-full px-4 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t('textAlignVal')} pr-10 text-gray-900`}
          value={selectedCategoryName}
          onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          dir={t('dirAttValue')}
        >
          <option value="" disabled>
            {t('selectCategory')}
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Product Input Component
const ProductInput = () => {
  const { t } = useTranslation();
  const productName = useSelector((state) => state.products.productName);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-end w-full max-w-xs md:max-w-md lg:max-w-lg">
      <label htmlFor="product-name" className={`relative w-full ${t('textAlignVal')} text-gray-700 mb-1`}>
        {t('productName')}
      </label>
      <input
        type="text"
        id="product-name"
        className={`block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t('textAlignVal')}`}
        value={productName}
        onChange={(e) => dispatch(setProductName(e.target.value))}
        placeholder={t('enterProductName')}
        dir={t('dirAttValue')}
      />
    </div>
  );
};

// Quantity Input Component
const QuantityInput = () => {
  const { t } = useTranslation();
  const productQuantity = useSelector((state) => state.products.productQuantity);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-end w-full max-w-xs md:max-w-md lg:max-w-lg">
      <label htmlFor="product-quantity" className={`relative w-full ${t('textAlignVal')} text-gray-700 mb-1`}>
        {t('quantity')}
      </label>
      <input
        type="number"
        id="product-quantity"
        className={`block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t('textAlignVal')}`}
        value={productQuantity}
        onChange={(e) => dispatch(setProductQuantity(parseInt(e.target.value) || 1))}
        min="1"
        max={MAX_PRODUCT_QUANTITY+5}
        dir={t('dirAttValue')}
      />
    </div>
  );
};

// Add to Cart Button Component
const AddToCartButton = ({ onShowMessage }) => {
  const { t } = useTranslation();
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  const productName = useSelector((state) => state.products.productName);
  const productQuantity = useSelector((state) => state.products.productQuantity);
  const dispatch = useDispatch();

  const handleAddToCartClick = () => {
    if (selectedCategory && productName.trim() && ((productQuantity > 0) && (productQuantity <= MAX_PRODUCT_QUANTITY))) {
      dispatch(addToCart({ category: selectedCategory, name: productName.trim(), quantity: productQuantity }));
      dispatch(setProductName(''));
      dispatch(setProductQuantity(1));
    } 
    else {
      onShowMessage('messageDialogGeneralHeader', t('dialogProductEmptyMessage'), 'messageDialogCloseButton', 'warning');
    }
  };

  return (
    <button
      onClick={handleAddToCartClick}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 mt-4 self-end w-fit"
    >
      {t('addToCart')}
    </button>
  );
};

// Shopping Cart Display Component
const ShoppingCart = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.products.cart);

  return (
    <div className="w-full mt-8 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
      <h3 className={`text-xl font-semibold text-gray-800 mb-4 ${t('textAlignVal')}`}>
        {t('shoppingCart')}
      </h3>
      {Object.keys(cart).length === 0 ? (
        <p className={`text-gray-600 ${t('textAlignVal')}`}>{t('cartEmpty')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(cart).map(([category, items]) => (
            <div key={category} className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
              <h4 className="font-bold text-lg text-blue-700 mb-2 text-right">{category}</h4>
              <ul className="list-none p-0 m-0" dir={t('dirAttValue')}>
                {items.map((item, index) => (
                  <li key={index} className={`flex justify-between items-center py-1 text-gray-700 ${t('textAlignVal')}`}>
                    <span>{item.name}</span>
                    <span className="font-medium text-gray-900"> – {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Continue Button Component
const ContinueButton = ({ onContinue, cart, onShowMessage }) => {
  const { t } = useTranslation();
  const handleContinueClick = () => {
    if (Object.keys(cart).length === 0) {
      onShowMessage('messageDialogGeneralHeader',t('dialogCartEmptyMessage'), 'messageDialogCloseButton', 'warning'); // Show message for empty cart
    } 
    else {
      onContinue(); // Proceed to second screen
    }
  };

  return (
    <button
      onClick={handleContinueClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mt-8 w-full w-fit"
    >
      {t('continueToOrder')}
    </button>
  );
};

// Unified Message Dialog Component
const MessageDialog = ({ header, message, closeButtonText, severity, onClose }) => {
  const { t } = useTranslation();
  let titleKey;
  let titleColorClass;
  let severityIcon;
  let severityTitle = 'severity-'+severity;

  switch (severity) {
    case 'info':
      severityIcon = '&#8505;';
      titleKey = 'dialogTitleSuccess';
      titleColorClass = 'text-green-600';
      break;
    case 'error':
      severityIcon = '&#9940;';
      titleKey = 'dialogTitleError';
      titleColorClass = 'text-red-600';
      break;
    case 'warning':
      severityIcon = '&#9888;';
      titleKey = 'dialogTitleWarning';
      titleColorClass = 'text-orange-600';
      break;
    default:
      severityIcon = '&#9888;';
      titleKey = 'dialogTitleWarning'; // Default to warning if severity is unknown
      titleColorClass = 'text-orange-800';
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center flex flex-col items-center" dir={t('dirAttValue')}>
        {/* add icon to the header */}
        <h3 className={`text-2xl font-bold mb-4 ${titleColorClass}`}>{t(header)} - {t(severityTitle)}</h3>
        <p className="text-gray-800 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full max-w-xs"
        >
          {t(closeButtonText)}
        </button>
      </div>
    </div>
  );
};

// OrderConfirmationForm component
const OrderConfirmationForm = ({ onBackToShopping, onShowMessage, cart }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fullName, fullAddress, email } = useSelector((state) => state.products);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleConfirmOrder = async () => {
    let message = '';
    let dialogHeaderKey = 'messageDialogGeneralHeader';
    let dialogButtonTextKey = 'messageDialogCloseButton';
    let severity = 'warning';
    if (!fullName.trim() || !fullAddress.trim() || !email.trim()) {
      message = t('alertFillAllFields');
      onShowMessage(dialogHeaderKey, message, dialogButtonTextKey, severity);
      return;
    }

    if (!isValidEmail(email)) {
      message = t('alertValidEmail');
      onShowMessage(dialogHeaderKey, message, dialogButtonTextKey, severity);
      return;
    }

    if (Object.keys(cart).length === 0) {
      message = t('alertCartEmpty');
      onShowMessage(dialogHeaderKey, message, dialogButtonTextKey, severity);
      return;
    }

    const orderData = {
      customer: {
        fullName,
        fullAddress,
        email,
      },
      products: Object.entries(cart).flatMap(([category, items]) =>
        items.map(item => ({
          category,
          name: item.name,
          quantity: item.quantity
        }))
      ),
      orderDate: new Date().toISOString(),
    };

    let url = BACKEND_ORDER_API_URL;
    console.log('About to submit order: ', orderData);
    console.log('Url is: ', url);

    try {
      const response = await fetch(`${url}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        // Handle HTTP errors (e.g., 400 Bad Request from NestJS validation, 500 Internal Server Error)
        const errorData = await response.json(); // Attempt to read error details from backend
        console.error('Backend Error Response:', errorData);
        message = `HTTP error! Status: ${response.status}, Message: ${errorData.message || response.statusText}`;
        console.error(message);
        onShowMessage(dialogHeaderKey, t('alertOrderError'), dialogButtonTextKey, 'error');
      }

      const data = await response.json();
      console.log('Order confirmed successfully:', data);
      message = t('alertOrderPrepared');
      onShowMessage(dialogHeaderKey, message, dialogButtonTextKey, 'info');
      dispatch(resetOrderForm()); // Clear the form fields
      dispatch(clearCart()); // Clear the shopping cart
      onBackToShopping(); // Go back to the first screen

    } 
    catch (error) {
      console.error('Error confirming order:', error);
      message = t('alertOrderError');
      onShowMessage(dialogHeaderKey, message, dialogButtonTextKey, 'error');
    }
  };

  return (
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-2xl mx-auto flex flex-col items-center" dir={t('dirAttValue')}>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center w-full">
          {t('orderConfirmation')}
        </h2>

        {/* Order Summary Section - Displays items from the shopping cart */}
        <div className="w-full mb-8 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
          <h3 className={`text-xl font-semibold text-gray-800 mb-4 ${t('textAlignVal')}`}>
            {t('orderSummary')}
          </h3>
          {Object.keys(cart).length === 0 ? (
            <p className={`text-gray-600 ${t('textAlignVal')}`}>{t('summaryNoItems')}</p>
          ) : (
            <div className="overflow-x-auto w-full"> {/* Responsive table container */}
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className={`py-3 px-6 ${t('textAlignVal')}`}>{t('summaryCategory')}</th>
                    <th className={`py-3 px-6 ${t('textAlignVal')}`}>{t('summaryProduct')}</th>
                    <th className="py-3 px-6 text-center">{t('summaryQuantity')}</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {Object.entries(cart).map(([category, items]) => (
                    items.map((item, index) => (
                      <tr key={`${category}-${item.name}-${index}`} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className={`py-3 px-6 whitespace-nowrap ${t('textAlignVal')}`}>{category}</td>
                        <td className={`py-3 px-6 ${t('textAlignVal')}`}>{item.name}</td>
                        <td className="py-3 px-6 text-center">{item.quantity}</td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Customer details input fields */}
        <div className="flex flex-col gap-4 w-full max-w-md md:max-w-lg items-end">
          {/* Full Name Input */}
          <div className="flex flex-col w-full">
            <label htmlFor="fullName" className={`${t('textAlignVal')} text-gray-700 mb-1`}>
              {t('fullName')} {t('requiredField')}
            </label>
            <input
              type="text"
              id="fullName"
              className={`block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t('textAlignVal')}`}
              value={fullName}
              onChange={(e) => dispatch(setFullName(e.target.value))}
              placeholder={t('enterFullName')}
              required
              dir={t('dirAttValue')}
            />
          </div>

          {/* Full Address Input */}
          <div className="flex flex-col w-full">
            <label htmlFor="fullAddress" className={`${t('textAlignVal')} text-gray-700 mb-1`}>
              {t('fullAddress')} {t('requiredField')}
            </label>
            <input
              type="text"
              id="fullAddress"
              className={`block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t('textAlignVal')}`}
              value={fullAddress}
              onChange={(e) => dispatch(setFullAddress(e.target.value))}
              placeholder={t('enterFullAddress')}
              required
              dir={t('dirAttValue')}
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col w-full">
            <label htmlFor="email" className={`${t('textAlignVal')} text-gray-700 mb-1`}>
              {t('email')} {t('requiredField')}
            </label>
            <input
              type="email"
              id="email"
              className={`block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t('textAlignVal')}`}
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              placeholder={t('enterEmail')}
              required
              dir={t('dirAttValue')}
            />
          </div>
        </div>

        {/* Confirm Order Button */}
        <button
          onClick={handleConfirmOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mt-8 w-full w-fit"
        >
          {t('confirmOrder')}
        </button>

        {/* Back to Shopping Button */}
        <button
          onClick={onBackToShopping}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out mt-4 w-full w-fit"
        >
          {t('backToShopping')}
        </button>
      </div>
  );
};


// Main App Component
const App = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [showSecondScreen, setShowSecondScreen] = useState(false);
  const [messageDialog, setMessageDialog] = useState({
    show: false,
    header: '',
    message: '',
    closeButtonText: '',
    severity: 'info',
  });
  const cart = useSelector((state) => state.products.cart);

  const effectRan = useRef(false);

  useEffect(() => {
    if (i18n.isInitialized && effectRan.current === false) {
      const fetchCategories = async () => {
        try {
          let url = BACKEND_PRODUCT_API_URL;
          console.log('Fetching categories from: ', url);

          const response = await fetch(url);

          if (!response.ok) {
            let message = `HTTP error while fetching catefories ! status: ${response.status}`;
            console.log(message);
            showMessageDialog('messageDialogGeneralHeader', t('alertCategoriesError'), 'messageDialogCloseButton', 'error');
            return;
          }

          const data = await response.json();
          dispatch(setCategories(data));
          if (data.length > 0) {
            //select the first value
            //dispatch(setSelectedCategory(data[0].name));
          }
        } 
        catch (error) {
          let message = 'Error fetching categories:' + error;
          console.log(message);
          showMessageDialog('messageDialogGeneralHeader', t('alertCategoriesError'), 'messageDialogCloseButton', 'error');
        }
      };

      fetchCategories();

      return () => {
        effectRan.current = true;
      };
    }
  }, [dispatch]);

  // Handler to show the message dialog
  const showMessageDialog = (header, message, closeButtonText, severity) => {
    setMessageDialog({ show: true, header, message, closeButtonText, severity });
  };

  // Handler to close the message dialog
  const closeMessageDialog = () => {
    setMessageDialog({ ...messageDialog, show: false });
  };

  // Function to change language
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-['Inter'] w-full">
        {/* container for header row */}
        <div className="rounded-lg flex items-center gap-x-[30px]">
          {/* shoppingcart icon */}
          <img src="/cart.svg" style={{width: "60px", height:"60px"}}/>

          {/* Language Switcher */}
          <select 
            id="lang-select" 
            value={i18n.language} // Current language
            onChange={changeLanguage} // Handle language change
            className={`block w-full px-4 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t('textAlignVal')} pr-10 text-gray-900`}
            dir={t('dirAttValue')} // Ensure correct direction for the dropdown itself
          >
            <option value="en">English</option>
            <option value="he">עברית</option>
          </select>
        </div>

        {/* Conditional rendering for the second screen */}
        {showSecondScreen ? (
          <OrderConfirmationForm
            onBackToShopping={() => setShowSecondScreen(false)} // Callback to go back to first screen
            onShowMessage={showMessageDialog} // Pass the message dialog handler
            cart={cart} // Pass the current cart contents to the second screen
          />
        ) : (
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-7xl mx-auto flex flex-col items-center" dir={t('dirAttValue')}>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center w-full">
              {t('appTitle')}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full mb-8">
              <CategoryDropdown />
              <ProductInput />
              <QuantityInput />
              <AddToCartButton onShowMessage={showMessageDialog} />
            </div>

            <ShoppingCart />

            {/* Pass the cart state and the new handler to ContinueButton */}
            <ContinueButton onContinue={() => setShowSecondScreen(true)} cart={cart} onShowMessage={showMessageDialog} />
        </div>
      )}

      {/* Render the unified MessageDialog */}
      {messageDialog.show && (
        <MessageDialog 
			    header={messageDialog.header}
          message={messageDialog.message}
          closeButtonText={messageDialog.closeButtonText}
          severity={messageDialog.severity}
          onClose={closeMessageDialog}
        />
      )}
    </div>
  );
};

export default App;
