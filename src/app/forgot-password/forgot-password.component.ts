import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {SendGmail} from '../auth/sendGmail';
import {toFormData} from '../register/register.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  gmail: SendGmail = new SendGmail();
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  newGmail(): void {
    this.submitted = false;
    this.gmail = new SendGmail();
  }

  sendGmail() {
    this.authService.forgotPassword(this.gmail.gmail).subscribe(data => {
        console.log(data);
        this.submitted = true;
        this.router.navigate(['rest-password']);
      },
      error => {
        console.log(error);
      });
  }
}

