import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: { 
        deposit(state, action) {
            state.balance = state.balance + action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance = state.balance - action.payload;
        },
        requestLoan: {
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance + action.payload.amount;
            },
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose },
                };
            }
        },
        payLoan(state) {
            state.balance = state.balance - state.loan;
            state.loan = 0;
            state.loanPurpose = '';
        },
        convertingCurrency(state) {
            state.isLoading = true;  // fix here
        }
    }
});

export const { deposit, withdraw, requestLoan, payLoan, convertingCurrency } = accountSlice.actions;

// Rename custom function to avoid conflict with deposit action
export function depositWithConversion(amount, currency) {
    if (currency === "USD") {
        return {
            type: "account/deposit",
            payload: amount
        };
    }

    return async function(dispatch) {
        try {
            dispatch(convertingCurrency());

            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
            const data = await res.json();
            const converted = data.rates.USD;

            dispatch({
                type: "account/deposit",
                payload: converted
            });
        } catch (error) {
            console.error("Currency conversion error: ", error);
        }
    };
}

export default accountSlice.reducer;


                      //PLAIN REDUX

// export default function AccountReducer (state =initialState,action){
//     switch(action.type){
//         case "account/deposit":
//             return{
//                 ...state,
//                 balance: state.balance + action.payload,
//                 isLoading:false,
//             }
//         case "account/withdraw":
//             return{
//                 ...state,
//                 balance: state.balance - action.payload
//             }
//         case "account/requestLoan":
//             if(state.loan >0 ) return state;
//             return{
//                 ...state,
//                 loan:action.payload.amount,
//                 loanPurpose:action.payload.purpose,
//                 balance: state.balance + action.payload.amount
//             };
//         case "account/payLoan":
//             return{
//                 ...state,
//                 loan:0,
//                 balance: state.balance - state.loan
//             };
//         case "account/convertCurrency":
//             return{
//                 ...state,
//                 isLoading: true,
//             }
//         default:
//             return state;
//     }

// }


// export function deposit(amount, currency) {
//     if (currency === "USD") {
//         return {
//             type: "account/deposit",
//             payload: amount
//         };
//     }

//     return async function(dispatch) {
       
//         try {
//              dispatch({type:"account/convertCurrency"})

//             const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
//             const data = await res.json();
//             const converted = data.rates.USD;

//             dispatch({
//                 type: "account/deposit",
//                 payload: converted
//             });

             
//         } catch (error) {
//             console.error("Currency conversion error: ", error);
//         }
//     };
// } ;
// // console.log(store.getState())

// export function withdraw(amount){
//         return{
//             type : "account/withdraw", payload:amount
//         }
// }
//     // store.dispatch((withdraw(200)))
//     // console.log(store.getState())

// export function requestLoan(amount,purpose){
//     return{
//         type : "account/requestLoan", payload:{
//         amount: amount,
//         purpose: purpose
//     }
// }
// }
// // store.dispatch(requestLoan(1000,"to buy a cheap car"));
// // console.log(store.getState())

// export function payloan(){
//     return{
//         type : "account/payLoan"
//     }
// }
// // store.dispatch(payloan())
// // console.log(store.getState())

