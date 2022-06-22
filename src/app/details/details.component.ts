import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Student } from 'src/app/shared/models/student.model';

import { Teacher } from './../shared/models/teacher.model';
import { StudentService } from './../shared/services/student.service';
import { TeacherService } from './../shared/services/teacher.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  student!: Student;
  teacher!: Teacher;
  disabledInput!: boolean;

  @Output() saveEvent = new EventEmitter<string>();
  profile: string = '';
  tipo: string = '';
  voltar: string = '';

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        console.log(params);
        params['tipo'] === 'student' ? this.getStudentById(params['id']) : this.getTeacherById(params['id'])
      }
    });
  }

  save(): void {    
    this.saveEvent.emit('Estudante salvo com sucesso!');
  }

  getStudentById(id: number): void {
    this.studentService.getStudentById(id).subscribe({
      next: (student: Student) => {
        this.student = student;
        this.profile = student.sexo;
        this.tipo = 'Student';
        this.voltar = '/students'
      }
    });
  }

  getTeacherById(id: number): void {
    this.teacherService.getTeacherById(id).subscribe({
      next: (teacher: Teacher) => {
        this.teacher = teacher;
        this.profile = teacher.sexo;
        this.tipo = 'Teacher';
        this.voltar = '/teachers';
      }
    });
  }

}
