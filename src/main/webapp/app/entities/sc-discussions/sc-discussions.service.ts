import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ScDiscussions } from './sc-discussions.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class ScDiscussionsService {

    private resourceUrl = 'api/sc-discussions';
    private resourceSearchUrl = 'api/_search/sc-discussions';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(scDiscussions: ScDiscussions): Observable<ScDiscussions> {
        const copy: ScDiscussions = Object.assign({}, scDiscussions);
        copy.startTime = this.dateUtils.toDate(scDiscussions.startTime);
        copy.lastTime = this.dateUtils.toDate(scDiscussions.lastTime);
        copy.hideTime = this.dateUtils.toDate(scDiscussions.hideTime);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(scDiscussions: ScDiscussions): Observable<ScDiscussions> {
        const copy: ScDiscussions = Object.assign({}, scDiscussions);

        copy.startTime = this.dateUtils.toDate(scDiscussions.startTime);

        copy.lastTime = this.dateUtils.toDate(scDiscussions.lastTime);

        copy.hideTime = this.dateUtils.toDate(scDiscussions.hideTime);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ScDiscussions> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            jsonResponse.startTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.startTime);
            jsonResponse.lastTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.lastTime);
            jsonResponse.hideTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.hideTime);
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
            jsonResponse[i].startTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].startTime);
            jsonResponse[i].lastTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].lastTime);
            jsonResponse[i].hideTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].hideTime);
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
