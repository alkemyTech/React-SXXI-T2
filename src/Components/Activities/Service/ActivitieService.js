import { getData, putData, postData, deleteData } from "Services/privateApiService";
import { errorAlert } from '../../../Services/alertService';

const section = "activities";
const url = "https://ongapi.alkemy.org/api/activities/";

export const getActivities = setData => {
	try {
		getData(url, setData, section);
	} catch (error) {
		errorAlert('Error', 'Ha ocurrido un error', 'Cerrar')
	}
	
};

export const postActivities = values => {
	try {
		postData(url, values, section);
	} catch (error) {
		errorAlert('Error', 'Ha ocurrido un error', 'Cerrar')
	}
};

export const putActivities = (id, values) => {
	try {
		putData(id, url, values, section);
	} catch (error) {
		errorAlert('Error', 'Ha ocurrido un error', 'Cerrar')
	}
};

export const deleteActivities = (id, values) => {
	try {
		deleteData(id, url, values, section);
	} catch (error) {
		errorAlert('Error', 'Ha ocurrido un error', 'Cerrar')
	}
};