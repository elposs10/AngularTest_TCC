// Angular imports
import {of} from 'rxjs';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import { Person } from '../model/person';
// Local imports
import * as data from '../../assets/mock-data/persons.json';
let persons: any[] = (data as any).default;

const getPersons = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: persons
  }));
};

const getPerson = (request: HttpRequest<any>) => {
  const id = extractIdPathParamFromUrl(request);
  const person = persons.find(p => p.id === id);
  return of(new HttpResponse({
    status: 200, body: person
  }));
};

const extractIdPathParamFromUrl = (request: HttpRequest<any>) => {
  const requestUrl = new URL(request.url);
  return requestUrl.pathname.split('/').pop();
};

const addPerson = (request: HttpRequest<any>) => {
  const person = request.body as Person;
  persons.push(person);
  return of(new HttpResponse({
    status: 200, body: person
  }));
};

const editPerson = (request: HttpRequest<any>) => {
  const id = extractIdPathParamFromUrl(request);
  const personIndex = persons.findIndex(p => p.id === id);
  const person = request.body as Person;
  persons[personIndex] = person;
  return of(new HttpResponse({
    status: 200, body: person
  }));
};

const removePerson = (request: HttpRequest<any>) => {
  const id = extractIdPathParamFromUrl(request);
  persons = persons.filter(p => p.id !== id);
  return of(new HttpResponse({
    status: 204
  }));
};

export const selectHandler = (request: HttpRequest<any>) => {
  const requestUrl = new URL(request.url);
  const getOneRegexp: RegExp = new RegExp(`/countries/[0-9a-zA-Z]+`);
  switch (request.method) {
    case 'GET':
      const pathname = requestUrl.pathname;
      if (pathname === '/persons') {
        return getPersons;
      } else if (getOneRegexp.test(pathname)) {
        return getPerson;
      } else {
        return null;
      }
    case 'POST':
      return addPerson;
    case 'PUT':
      return editPerson;
    case 'DELETE':
      return removePerson;
    default:
      return null;
  }
};