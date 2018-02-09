import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ScTags } from './sc-tags.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class ScTagsService {

    private resourceUrl = 'api/sc-tags';
    private resourceSearchUrl = 'api/_search/sc-tags';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(scTags: ScTags): Observable<ScTags> {
        const copy: ScTags = Object.assign({}, scTags);
        copy.lastTime = this.dateUtils.toDate(scTags.lastTime);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(scTags: ScTags): Observable<ScTags> {
        const copy: ScTags = Object.assign({}, scTags);

        copy.lastTime = this.dateUtils.toDate(scTags.lastTime);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ScTags> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            jsonResponse.lastTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.lastTime);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }


    private convertResponse(res: any): any {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].lastTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].lastTime);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        const options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            const params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
