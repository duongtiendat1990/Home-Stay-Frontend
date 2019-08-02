import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ResetPassword} from '../auth/resetPassword';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent implements OnInit {
  form: any = {};
  errorMessage = '';
  private resetPassWord: ResetPassword;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.resetPassWord = new ResetPassword(
      this.form.gmail,
      this.form.password
    );

    this.authService.restPassword(this.resetPassWord).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['home']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }
}
