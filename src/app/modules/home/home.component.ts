import { CookieService } from 'ngx-cookie-service';
import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { SignupUserResponse } from 'src/app/models/interfaces/user/SignupUserResponse';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService,
    private CookieService: CookieService,
    ) {}

  OnSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid){
      this.UserService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next: (response) => {
          if (response){
            this.CookieService.set('USER_INFO', response?.token);

            this.loginForm.reset();
          }
        },
        error: (err) => console.log(err),
      });
    }
  }

  OnSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid){
      this.UserService
      .signupUser(this.signupForm.value as SignupUserRequest)
      .subscribe({
        next: (response) => {
          if(response) {
            alert('Usuário teste criado com sucesso!');
            this,this.signupForm.reset();
            this.loginCard = true;
          }
        },
        error: (err) => console.log(err),
      });
    }
  }
}
