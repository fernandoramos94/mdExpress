import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  credentialsForm: FormGroup;
  authenticationState = new BehaviorSubject(false);
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private storage: Storage) { }
 
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  storageSession(response:any){
    
    let expired_at = (response.expires_in * 1000) + Date.now();
    this.storage.set('access_token', {
      access_token: response.token,
      refresh_token: response.token,
      expired_at
    })
    this.storage.set('infoUser', {
      data: response.user
    })
  }
 
  onSubmit() {
    this.authService.login(this.credentialsForm.value).then(res => {
      this.storageSession(res);
      this.authenticationState.next(true);
    });
  }
 
  register() {
    this.authService.register(this.credentialsForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      this.authService.login(this.credentialsForm.value).then(resp => {
        this.storageSession(res);
      });
    });
  }
 
}