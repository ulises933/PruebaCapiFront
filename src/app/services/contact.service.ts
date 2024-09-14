import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8000/api/contactos'; // Base URL

  constructor(private http: HttpClient) {}

  getContacts(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }
  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}`, contact);
  }
  getContactById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateContact(id: string, contactData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, contactData);
  }
  

  searchContactsByName(name: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/buscar/nombre/${name}`);
  }

  searchContactsByCompany(company: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/buscar/empresa/${company}`);
  }

  searchContactsByCity(city: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/buscar/ciudad/${city}`);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
