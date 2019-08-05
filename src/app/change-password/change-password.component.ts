import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {ChangePassword} from '../auth/changePassword';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResetPassword} from '../auth/resetPassword';

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: any = {};
  errorMessage = '';
  isChangePasswordFailed = false;
  private updatePassWord: ChangePassword;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.updatePassWord = new ChangePassword(
      this.form.currentPassword,
      this.form.newPassword
    );

    this.authService.updatePassword(this.updatePassWord).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['home']);
        this.isChangePasswordFailed = false;
      },
      error => {
        console.log(error);
        this.isChangePasswordFailed = true;
        this.errorMessage = error.error.message;
      }
    );
  }

}


