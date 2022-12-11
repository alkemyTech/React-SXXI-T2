import { getUser, postNewUser, putUser } from '../../Services/publicApiService';
const url = "/users/";

export const publicGetUser = (id) => {
	getUser(url, id);
};

export const publicPostNewUser = userValues => {
	postNewUser(url, userValues);
};

export const publicPutUser = (id, userValues) => {
	putUser(url, id, userValues);
};
