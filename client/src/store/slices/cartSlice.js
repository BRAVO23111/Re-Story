import { createSlice } from "@reduxjs/toolkit";

// Load cart items from localStorage if available
const loadCartFromStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cartItems');
        if (serializedCart === null) {
            return [];
        }
        return JSON.parse(serializedCart);
    } catch (err) {
        console.error('Error loading cart from localStorage:', err);
        return [];
    }
};

const initialState = {
    cartItems: loadCartFromStorage(),
}

// Helper function to save cart to localStorage
const saveCartToStorage = (cartItems) => {
    try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (err) {
        console.error('Error saving cart to localStorage:', err);
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action) => {
            const items = state.cartItems.find((i) => i.id === action.payload.id);
            if(items){
                items.quantity += 1;
            }
            else{
                state.cartItems.push({...action.payload, quantity: 1});
            }
            // Save updated cart to localStorage
            saveCartToStorage(state.cartItems);
        },
        removeCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.id != action.payload);
            // Save updated cart to localStorage
            saveCartToStorage(state.cartItems);
        },
        increaseQuantity: (state, action) => {
            const items = state.cartItems.find((i) => i.id === action.payload.id);
            if(items) items.quantity += 1;
            // Save updated cart to localStorage
            saveCartToStorage(state.cartItems);
        },
        decreaseQuantity: (state, action) => {
            const items = state.cartItems.find((i) => i.id === action.payload.id);
            if(items) {
                if(items.quantity > 1){
                    items.quantity -= 1;
                }
            }
            else {
                state.cartItems = state.cartItems.filter((i) => i.id != action.payload.id);
            }
            // Save updated cart to localStorage
            saveCartToStorage(state.cartItems);
        },
        clearCart: (state) => {
            state.cartItems = [];
            // Save updated cart to localStorage
            saveCartToStorage(state.cartItems);
        },
    },
});

export const {addCart, removeCart, increaseQuantity, decreaseQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;