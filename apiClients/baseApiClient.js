import { URL } from 'url';
import request from 'request';

export default class BaseApiClient {
    constructor(baseUrl, requiredParams) {
        this.baseUrl = baseUrl;
        this.requiredParams = requiredParams;
    }

    requestUrl(endpoint) {
        const requestUrl = new URL(endpoint, this.baseUrl);
        this.requiredParams.forEach(param => requestUrl.searchParams.append(param.name, param.value));
        return requestUrl.href;
    }

    makeGetRequest(endpoint, onSuccess, onError) {
        const url = this.requestUrl(endpoint);
        request.get(url, (err, response, body) => {
            if (err) {
                onError(err);
            } else if (response.statusCode !== 200) {
                onError(new Error(`Request to ${url} failed with status code ${response.statusCode}. ${JSON.parse(body).message}`));
            } else {
                onSuccess(response, body);
            }
        });
    }
}
