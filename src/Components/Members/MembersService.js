import { getData, putData, postData, deleteData } from "Services/privateApiService";
const url = "/members/";
export const getMembers = setData => {
	getData(url, null, setData);
};

export const postMembers = values => {
	postData(url, values);
};

export const putMembers = (id, values) => {
	putData(url, id, values);
};

export const deleteMembers = (id, values) => {
	deleteData(url, id, values);
};