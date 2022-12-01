import { getData, putData, postData } from "Services/privateApiService";
const url = "/organization/";
export const getHome = setData => {
	getData(url, null, setData);
};

export const postHome = values => {
	postData(url, values);
};

export const putHome = (id, values) => {
	putData(url, id, values);
};
