import {
    applyMiddleware,
    combineReducers,
    compose,
    legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import { ElectronAuthReducer, UserAuthReducer } from "./Auth/Auth.reducer";
import { UserReducer } from "./Reducer";

const rootReducer = combineReducers({
    UserAuthManager: UserAuthReducer,
    ElectronAuthManager: ElectronAuthReducer,
    UserManager: UserReducer,
});




export const store = legacy_createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
);