import { Component } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user.model';
import { Performing } from '../models/performing';

import { GwService } from '../services/gw.service';
import { AuthService } from '../auth/services/auth.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {
  userId: number = 0;

  title: string = '';
  description: string = '';

  performingList: Performing[] = [];

  isTeacher: boolean = false;
  isStudent: boolean = false;

  average: number = 0;

  fileData!: File;

  user: User = {
    id: 0,
    username: '',
    role: '',
    avatar: '',
    fullName: '',
    faculty: '',
    capacity: 0,
    gpa: 0,
    position: '',
    skills: [],
    linkedin: '',
    hasTheme: false,
    joinedAt: new Date(),
  };

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private gwService: GwService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = Number(params['userId'])
      this.getPerformingList(this.userId)
    });

    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.description = params['description']
    });

    if (this.user.role === 'teacher') {
      this.isTeacher = true; 
    } else if (this.user.role === 'student') {
      this.isStudent = true;
    }

    this.form = new FormGroup({
      done: new FormControl(''),
      comment: new FormControl('')
    });
    
  }

  checkAcceptedStatus(details: any[]): boolean {
    return details.some(detail => detail.status === 'accepted');
  }

  getPerformingList(userId: number) {
    this.gwService.getPerforming(userId).subscribe({
      next: data => {
        this.performingList = data.list;
        this.average = data.average;
      }
    })
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.fileData = files[0];
    }
  }

  sendRequest(id: number) {
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('typeId', String(id));
    this.gwService.sendRequest(formData).subscribe({
      next: data => {
        this.sharedService.changeToasterMessageStatus(true);
        this.sharedService.changeToasterMessage(data.message);
        this.getPerformingList(this.userId)
        this.sharedService.getThemesById(this.user);
        setTimeout(() => {
          this.sharedService.changeToasterMessageStatus(false);
        }, 1500)
      }
    })
  }

  recieve(status: string, requestId: number) {
    const { done, comment } = this.form.value;
    this.gwService.receiveRequest(requestId, status, done, comment).subscribe({
      next: data => {
        this.sharedService.changeToasterMessageStatus(true);
        this.sharedService.changeToasterMessage(data.message);
        this.getPerformingList(this.userId)
        this.sharedService.getThemesById(this.user);
        setTimeout(() => {
          this.sharedService.changeToasterMessageStatus(false);
        }, 1500)
      }
    })
    this.form.reset()
  }
}
