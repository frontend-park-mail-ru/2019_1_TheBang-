import BackendResource from 'src/network/BackendResource';

/**
 * Запросы на бекенд
 */

function fetchWithTimeout(url, request, timeout = 3000) {
	return Promise.race([
		fetch(url, request),
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error('timeout')), timeout)
		)
	]);
}

class Request {
	static request(path, method, data, url = [BackendResource.BASE, path].join('')) {
		const request = {
			mode: 'cors',
			method: method,
			body: data,
			credentials: 'include'
		};

		return fetchWithTimeout(url, request).then(res => {
			if (res && res.status > 299) {
				throw res.status;
			}
			return res;
		});
	}

	static gameRequest(path, method, data) {
		const url = [BackendResource.GAME, path].join('');

		return Request.request(path, method, data, url)
	}

	static image(name) {
		return [BackendResource.BASE, 'icon/', name || 'default_img'].join('');
	}
}

export default Request;
