import { configureStore } from "@reduxjs/toolkit";
import CartReducercer from "./redux/CartReducercer";

export default configureStore({
    reducer: {
        cart: CartReducercer
    }
})