import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Student } from '../models/student.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentUrl = environment.baseUrl + '/students';

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.studentUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.httpClient.get<Student>(this.studentUrl + `/${id}`);
  }

}
