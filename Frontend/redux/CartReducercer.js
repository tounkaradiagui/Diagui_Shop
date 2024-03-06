import {createSlice} from '@reduxjs/toolkit'

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id);
            if(itemPresent){
                itemPresent.quantity++;
            } else {
                state.cart.push({...action.payload, quantity: 1});
            }
        },
        removeFromCart: (state, action) => {
            const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
            state.cart = removeItem;
        },
        incrementQuantity:(state, action) => {
            const targetItem = state.cart.find((item)=> item.id === action.payload.id);
            targetItem.quantity++;
        },
        decrementQuantity : (state, action) => {
            const targetItem = state.cart.find((item)=> item.id === action.payload.id);
            if(targetItem.quantity === 1){
                targetItem.quantity = 0;
                const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
                state.cart = removeItem;
            } else {
                targetItem.quantity--;
            }
        },
        clearCart : (state) => {
            state.cart = [];
        }
    }
});

export  const {addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = CartSlice.actions;
// Action creators are generated for each case reducer function
export default  CartSlice.reducer