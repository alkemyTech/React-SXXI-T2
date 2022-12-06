import { publicGetData, publicPostData, publicPutData } from "Services/publicApiService";
const url = "/organization/";

export const getHome = setData => {
	publicGetData(url, null, setData);
};

export const postHome = values => {
	publicPostData(url, values);
};

export const putHome = (id, values) => {
	publicPutData(url, id, values);
};
