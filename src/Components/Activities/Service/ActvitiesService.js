import { getData, putData, postData, deleteData } from "Services/privateApiService";

const url = "/activities/";

export const getActivities = setData => {
	getData(url, null, setData);
};

export const postActivities = values => {
	postData(url, null, values);
};

export const putActivities = (id, values) => {
	putData(url, id, values);
};

export const deleteActivities = (id, values) => {
	deleteData(url, id, values);
};