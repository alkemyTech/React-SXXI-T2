import { getData, putData, postData, deleteData } from "Services/privateApiService";

const section = "activities";
const url = "https://ongapi.alkemy.org/api/activities/";

export const getActivities = setData => {
	getData(url, setData, section);
};

export const postActivities = values => {
	postData(url, values, section);
};

export const putActivities = (id, values) => {
	putData(id, url, values, section);
};

export const deleteActivities = (id, values) => {
	deleteData(id, url, values, section);
};