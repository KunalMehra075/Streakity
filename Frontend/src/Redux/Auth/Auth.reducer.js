import * as types from "./Auth.types";

const ElectronInitState = {
    token: JSON.parse(localStorage.getItem("electron_login_token")),
    isAuth: JSON.parse(localStorage.getItem("electron_login_token")) ? true : false,
    ElectronDetail: JSON.parse(localStorage.getItem("electron_details_streakity")) || null,
    loading: false,
    error: false,
};
const UserInitState = {
    token: JSON.parse(localStorage.getItem("user_login_token")),
    isAuth: JSON.parse(localStorage.getItem("user_login_token")) ? true : false,
    UserDetail: JSON.parse(localStorage.getItem("user_details_streakity")) || null,
    loading: false,
    error: false,
};

export const ElectronAuthReducer = (state = ElectronInitState, { type, payload }) => {
    switch (type) {
        case types.ELECTRON_AUTH_LOGIN_LOADING: {
            return {
                ...state,
                loading: true,
                error: false,
            };
        }
        case types.ELECTRON_AUTH_LOGIN_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
            };
        }

        case types.ELECTRON_AUTH_LOGIN_SUCCESS: {
            localStorage.setItem("electron_login_token", JSON.stringify(payload?.token));
            localStorage.setItem("electron_details_streakity", JSON.stringify(payload?.electron));
            return {
                ...state,
                loading: false,
                error: false,
                isAuth: true,
                token: payload?.token,
                ElectronDetail: payload?.user
            };
        }

        case types.ELECTRON_LOGOUT: {
            localStorage.removeItem("electron_login_token");
            localStorage.removeItem("electron_details_streakity");
            return {
                ...state,
                isAuth: false,
                token: null,
                ElectronDetail: null
            };
        }

        default: {
            return state;
        }
    }
};
export const UserAuthReducer = (state = UserInitState, { type, payload }) => {
    switch (type) {
        case types.USER_AUTH_LOGIN_LOADING: {
            return {
                ...state,
                loading: true,
                error: false,
            };
        }
        case types.USER_AUTH_LOGIN_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
            };
        }

        case types.USER_AUTH_LOGIN_SUCCESS: {
            localStorage.setItem("user_login_token", JSON.stringify(payload?.token));
            localStorage.setItem("user_details_streakity", JSON.stringify(payload?.user));
            return {
                ...state,
                loading: false,
                error: false,
                isAuth: true,
                token: payload?.token,
                UserDetail: payload?.user
            };
        }

        case types.USER_LOGOUT: {
            localStorage.removeItem("user_login_token");
            localStorage.removeItem("user_details_streakity");
            return {
                ...state,
                isAuth: false,
                token: null,
                UserDetail: null
            };
        }

        default: {
            return state;
        }
    }
};
