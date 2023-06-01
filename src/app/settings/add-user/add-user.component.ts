import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { faShuffle } from '@fortawesome/free-solid-svg-icons';

import { Skill } from 'src/app/models/skill.model';

import { GwService } from 'src/app/services/gw.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  hide: boolean = true;
  addUserModalStatus: boolean = false;

  generateIcon = faShuffle;

  avatarImage: string = '';

  addUserForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    position: [''],
    role: ['student', [Validators.required]],
    gpa: [0],
    linkedin: [''],
    capacity: [0],
    faculty: [''],
    skills: [[]]
  })

  skills: Skill[] = [];

  constructor(
    private fb: FormBuilder,
    private gwService: GwService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sharedService
      .addUserModalStatus
      .subscribe(status => this.addUserModalStatus = status);

    this.getSkills();
  }

  closeAddUserModal() {
    this.sharedService.changeAddUserModalStatus(false);
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarImage = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

  addUser() {
    if (this.addUserForm.valid) {
      const { faculty, fullName, gpa, password, position, role, skills, username, capacity, linkedin } = this.addUserForm.value;
      this.gwService.addUser(
        String(username), 
        String(password), 
        String(fullName), 
        position ? position : null, 
        this.avatarImage ? this.avatarImage : null, 
        String(role), 
        gpa ? gpa : null, 
        faculty ? faculty : null, 
        skills, 
        capacity ? capacity : null, 
        linkedin ? linkedin : null
      ).subscribe({
        next: data => {
          this.sharedService.changeToasterMessageStatus(true);
          this.sharedService.changeToasterMessage(data.message);
          this.sharedService.changeAddUserModalStatus(false);
          this.sharedService.getUsers();
          setTimeout(() => {
            this.sharedService.changeToasterMessageStatus(false);
            this.addUserForm.reset()
          }, 1500)
        }
      })
    }
  }

  getSkills() {
    this.gwService.getSkillsList().subscribe({
      next: data => {
        this.skills = data;
      }
    })
  }

  generate() {
    this.addUserForm.get('password')?.setValue(this.generatePassword(10))
  }

  generatePassword(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars.charAt(randomIndex);
    }
    return password;
  }
}
