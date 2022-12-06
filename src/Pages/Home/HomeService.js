import { publicGetData, publicPostData, publicPutData } from "Services/publicApiService";
const url = "/organization/";

export const getHome = Data => {
	publicGetData(url, null, Data);
};

export const postHome = values => {
	publicPostData(url, values);
};

export const putHome = (id, values) => {
	publicPutData(url, id, values);
};
