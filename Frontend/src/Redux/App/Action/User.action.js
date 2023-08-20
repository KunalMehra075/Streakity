
import axios from "axios";
import * as UserTypes from "../Types/User.types";
import { BASE_URL } from "../../../utils/config";


export const getUsers = (page, setAllUsers) => (dispatch) => {
    if (!page) page = 1
    dispatch({ type: UserTypes.USER_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/user/get-all-users?page=${page}`)
        .then((res) => {
            dispatch({ type: UserTypes.USER_GET_SUCCESS, payload: res?.data });
            setAllUsers(res?.data?.Users)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: UserTypes.USER_GET_ERROR,
                payload: err?.response?.data?.msg,
            });
        });
};
export const getUserByID = (id, setMarkUser, setMarkStudents) => (dispatch) => {

    if (!id) return dispatch({ type: UserTypes.USER_GET_BY_ID_ERROR })

    dispatch({ type: UserTypes.USER_GET_BY_ID_LOADING });

    axios
        .get(`${BASE_URL}/api/user/get-user-by-id/${id}`)
        .then((res) => {
            dispatch({ type: UserTypes.USER_GET_BY_ID_SUCCESS, payload: res?.data });
            setMarkUser(res?.data?.User)
            setMarkStudents(res?.data?.User?.students)
        })
        .catch((err) => {
            console.log(err);

            dispatch({
                type: UserTypes.USER_GET_BY_ID_ERROR,
                payload: err?.response?.data?.msg,
            });
        });
};

export const postUser = (data, navigate, toast) => (dispatch) => {
    dispatch({ type: UserTypes.USER_POST_LOADING });
    axios
        .post(`${BASE_URL}/api/user/create-user`, data)
        .then((res) => {
            dispatch({ type: UserTypes.USER_POST_SUCCESS });
            toast({
                title: "You have been registerd to us successfully. We will contact you shortly.",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "top"
            });
            navigate("/")
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: err?.response?.data?.msg || "Something Went wrong",
                status: "error",
                duration: 4000,
                position: "top"
            });
            dispatch({
                type: UserTypes.USER_POST_ERROR,
                payload: err?.response?.data?.msg,
            });
        });
};
export const ApproveUser = (id, data, toast, navigate, getData) => (dispatch) => {
    dispatch({ type: UserTypes.USER_UPDATE_LOADING });
    axios
        .patch(`${BASE_URL}/api/user/approve-user/${id}`, data)
        .then(() => {
            dispatch({ type: UserTypes.USER_UPDATE_SUCCESS });
            toast({
                title: "User Status Updated to " + data.USER_status.toUpperCase(),
                status: "success",
                duration: 4000,
                isClosable: true, position: "top",
            });
            // navigate("/User");
            getData()
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: err?.response?.data?.msg || "Something Went wrong",
                status: "error",
                duration: 4000,
                position: "top"
            });
            dispatch({
                type: UserTypes.USER_UPDATE_ERROR,
                payload: err?.response?.data?.msg,
            });
        });
};






export const DeleteUserByID = (id, toast, getData) => (dispatch) => {

    dispatch({ type: UserTypes.USER_UPDATE_LOADING });
    axios
        .delete(`${BASE_URL}/api/user/delete-user/${id}`)
        .then(() => {
            dispatch({ type: UserTypes.USER_UPDATE_SUCCESS });
            toast({
                title: "User Deleted Successfully",
                status: "success",
                duration: 4000,
                isClosable: true, position: "top",
            });
            getData()
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: err?.response?.data?.msg || "Something Went wrong",
                status: "error",
                duration: 4000,
                position: "top"
            });
            dispatch({
                type: UserTypes.USER_UPDATE_ERROR,
                payload: err?.response?.data?.msg,
            });
        });
};

export const UpdateUser = (id, data, getData, toast) => (dispatch) => {
    dispatch({ type: UserTypes.USER_UPDATE_LOADING });

    axios
        .patch(`${BASE_URL}/api/user/update-user/${id}`, data)
        .then(() => {
            dispatch({ type: UserTypes.USER_UPDATE_SUCCESS });
            toast({
                title: "User Updated Successfully",
                status: "success",
                duration: 4000, position: "top",
                isClosable: true,
            });

            getData()
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: err?.response?.data?.msg || "Something Went wrong",
                status: "error",
                duration: 4000,
                position: "top"
            });
            dispatch({
                type: UserTypes.USER_UPDATE_ERROR,
                payload: err?.response?.data?.msg,
            });
        });
};
export const UpdateUserProfile = (id, data, toast, navigate) => (dispatch) => {
    dispatch({ type: UserTypes.USER_UPDATE_LOADING });

    axios
        .patch(`${BASE_URL}/api/user/update-user-profile/${id}`, data)
        .then((res) => {
            dispatch({ type: UserTypes.USER_UPDATE_SUCCESS });
            toast({
                title: "User Updated Successfully",
                status: "success",
                duration: 4000, position: "top",
                isClosable: true,
            });
            let newuser = res?.data?.UpdatedUser
            localStorage.setItem("user_details_streakity", JSON.stringify(newuser));
            navigate("/user/dashboard")
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: err?.response?.data?.msg || "Something Went wrong",
                status: "error",
                duration: 4000,
                position: "top"
            });
            dispatch({
                type: UserTypes.USER_UPDATE_ERROR,
                payload: err?.response?.data?.msg,
            });
        });
};

export const SendUserEmail = (data, toast) => (dispatch) => {
    dispatch({ type: UserTypes.USER_SEND_LOADING });
    axios
        .post(`${BASE_URL}/api/test/send-mail`, data)
        .then(() => {
            dispatch({ type: UserTypes.USER_SEND_SUCCESS });
            toast({
                title: "User Sent to Client Successfully",
                status: "success",
                duration: 4000,
                isClosable: true, position: "top",
            });
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: err?.response?.data?.msg || "Something Went wrong",
                status: "error",
                duration: 4000,
                position: "top"
            });
            dispatch({
                type: UserTypes.USER_SEND_ERROR,
                payload: err?.response?.data?.msg,
            });
        });
};
export const ChangeUserPassword = (data, getData, toast) => (dispatch) => {
    dispatch({ type: UserTypes.USER_UPDATE_LOADING });

    axios
        .patch(`${BASE_URL}/api/user/change-password`, data)
        .then(() => {
            dispatch({ type: UserTypes.USER_UPDATE_SUCCESS });
            toast({
                title: "Password Of User Changed Successfully",
                status: "success",
                duration: 4000, position: "top",
                isClosable: true,
            });

            getData()
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: err?.response?.data?.msg || "Something Went wrong",
                status: "error",
                duration: 4000,
                position: "top"
            });
            dispatch({
                type: UserTypes.USER_UPDATE_ERROR,
                payload: err?.response?.data?.msg,
            });
        });
};
