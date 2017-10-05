import { URL } from 'url';
import request from 'request';

export default class BaseApiClient {
    constructor(baseUrl, requiredParams) {
        this.baseUrl = baseUrl;
        this.requiredParams = requiredParams;
    }

    requestUrl(endpoint, parameters) {
        const requestUrl = new URL(endpoint, this.baseUrl);
        parameters.forEach(param => requestUrl.searchParams.append(param.name, param.value));
        this.requiredParams.forEach(param => requestUrl.searchParams.append(param.name, param.value));
        return requestUrl.href;
    }

    makeGetRequest(endpoint, parameters) {
        const url = this.requestUrl(endpoint, parameters);
        return new Promise((resolve, reject) => 
            request.get(url, (err, response, body) => {
                if (err) {
                    reject(err);
                } else if (response.statusCode !== 200) {
                    reject(`Request to ${url} failed with status code ${response.statusCode}. Details:\n\n${body}`);
                } else {
                    resolve(body);
                }
            })
        );
    }
}
