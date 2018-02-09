import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ScPosts } from './sc-posts.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class ScPostsService {

    private resourceUrl = 'api/sc-posts';
    private resourceSearchUrl = 'api/_search/sc-posts';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(scPosts: ScPosts): Observable<ScPosts> {
        const copy: ScPosts = Object.assign({}, scPosts);
        copy.time = this.dateUtils.toDate(scPosts.time);
        copy.editTime = this.dateUtils.toDate(scPosts.editTime);
        copy.hideTime = this.dateUtils.toDate(scPosts.hideTime);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(scPosts: ScPosts): Observable<ScPosts> {
        const copy: ScPosts = Object.assign({}, scPosts);

        copy.time = this.dateUtils.toDate(scPosts.time);

        copy.editTime = this.dateUtils.toDate(scPosts.editTime);

        copy.hideTime = this.dateUtils.toDate(scPosts.hideTime);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ScPosts> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            jsonResponse.time = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.time);
            jsonResponse.editTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.editTime);
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
            jsonResponse[i].time = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].time);
            jsonResponse[i].editTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].editTime);
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
