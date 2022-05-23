import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CheckPoolReq } from '../models/request/check-pool-req';
import { checkPoolResp } from '../models/response/check-pool-resp';
import { DbModel } from '../models/db-model';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private HEALTH_DATABASE: string = '';
  constructor(private http: HttpClient) {
    const { SERVICE_PROJECT, SERVICE_URL } = environment;
    this.HEALTH_DATABASE = SERVICE_URL.concat(SERVICE_PROJECT);
  }

  public getDb(): Observable<boolean> {
    return this.http
      .get<boolean>(this.HEALTH_DATABASE + '/db')
      .pipe(retry(3), catchError(this.handleError));
  }

  public postDb(req: CheckPoolReq): Observable<checkPoolResp> {
    return this.http
      .post<checkPoolResp>(this.HEALTH_DATABASE + '/db', req)
      .pipe(retry(3), catchError(this.handleError));
  }

  public putDb(req: DbModel): Observable<boolean> {
    return this.http
      .put<boolean>(this.HEALTH_DATABASE + '/db', req)
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
