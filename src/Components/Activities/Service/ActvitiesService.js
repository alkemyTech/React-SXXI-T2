import { getData, putData, postData, deleteData } from "Services/privateApiService";

const url = "/activities/";

export const getActivities = setData => {
	getData(url, null, setData);
};

export const postActivity = values => {
	postData(url, values);
};

export const putActivity = (id, values) => {
	putData(url, id, values);
};

export const deleteActivity = (id, values) => {
	deleteData(url, id, values);
};