import { publicGetData } from "../../Services/publicApiService";

const url = "/organization";

export const getHome = async () => {
	publicGetData(null, `${url}`);
};
