import { getData, putData, postData, deleteData } from "Services/privateApiService";
const url = "/users/";
export const getUsers = setData => {
	getData(url, null, setData);
};

export const postActivity = values => {
	postData(url, values);
};

export const putUser = (id, values) => {
	putData(url, id, values);
};

export const deleteUser = (id, values) => {
	deleteData(url, id, values);
};