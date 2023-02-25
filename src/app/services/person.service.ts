// Angular imports
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// Local imports
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = 'http://localhost:3000/persons';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Person[]> {
    return this.http.get<any>(this.baseUrl);
  }

  get(id: any): Observable<Person> {
    return this.http.get<any>(this.baseUrl + '/' + id);
  }

  create(person: Person) {
    return this.http.post<any>(this.baseUrl, person);
  }

  update(id: string, person: Person): Observable<Person> {
    return this.http.put<any>(this.baseUrl + '/' + id, person);
  }

  delete(id: string) {
    return this.http.delete<any>(this.baseUrl + '/' + id);
  }
}