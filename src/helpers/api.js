import axios from "axios";

const headers = {
	Authorization: `Bearer ${localStorage.getItem('token')}`,
	'Access-Control-Allow-Origin': '/',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
	'Access-Control-Allow-Headers':
	'Origin, X-Requested-With, Content-Type, Accept, Authorization',
	'Content-Type': 'application/json',
}

const instanceBl = axios.create({
    baseURL: '/cosmonaut',
    headers,
    transformResponse: [
		(data, headers) => {
			const parsedData = JSON.parse(data)
			if (parsedData.result) return parsedData.result
			return parsedData
		},
	],
	data: null,
});

const instance = axios.create({
    baseURL: '/api',
    headers,
    transformResponse: [
		(data, headers) => {
			const parsedData = JSON.parse(data)
			if (parsedData.result) return parsedData.result
			return parsedData
		},
	],
	data: null,
});

export const axiosGetBl = (url, ...params) => {
    return instanceBl.get(url, ...params).then(res  => res.data)
};


export const axiosGet = (url, ...params) => {
    return instance.get(url, ...params).then(res  => res.data)
};

export const axiosPost = (url, data, ...params) => {
    return instance.post(url, data, ...params).then(res => res.data)
};
	
export const axiosDelete = (url, ...params) => {
    return instance.delete(url, ...params).then(res => res.data);
};

// // Add a response interceptor
// const resultInterceptor = (res) => {
//     if (res.data) {
//         res = res.data;
//     }
//     return res;
// }

const errInterceptor = (err) => {
    //add error handling
    return Promise.reject(err);
};
	
instance.interceptors.response.use(null, errInterceptor);