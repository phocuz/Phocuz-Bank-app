               // USING REDUX ONLY
// import {applyMiddleware, combineReducers, createStore} from "redux";
// import {thunk} from "redux-thunk"
// import AccountReducer from "./features/accounts/accountSlice";
// import {composeWithDevTools} from "redux-devtools-extension"
// import customerReducer from "./features/customers/customerSlice";


// const rootReducer = combineReducers({
//     account: AccountReducer,
//     customer: customerReducer,
// })
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


// export default store;

                    //USING REDUX TOOLKIT
import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
