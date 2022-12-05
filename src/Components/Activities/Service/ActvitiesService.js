import { getData, putData, postData, deleteData } from "Services/privateApiService";
import { confirmAlert, errorAlert } from "../../../Services/alertService";

const section = "activities";
const url = "https://ongapi.alkemy.org/api/activities/";

export const getActivities = setData => {
	const response = getData(url, setData, section);
	if (response.errorAlert) return errorAlert;
	setData(response.getData)	
};

export const postActivities = values => {
	const response = postData(url, values, section);
	if (response.errorAlert) return errorAlert;
	return confirmAlert;
};

export const putActivities = (id, values) => {
	const response = putData(id, url, values, section);
	if (response.errorAlert) return errorAlert;
	return confirmAlert;
};

export const deleteActivities = (id, values) => {
	const response = deleteData(id, url, values, section);
	if (response.errorAlert) return errorAlert;
	return confirmAlert;
};