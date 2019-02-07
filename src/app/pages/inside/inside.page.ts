import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { AppService } from '../../services/api/app.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {
 
  usuario : any;
 
  constructor(private authService: AuthService, 
    private storage: Storage, 
    private toastController: ToastController, 
    private apis: AppService,
    private router: Router
    ) { }
 
  ngOnInit() {
    this.storage.get("infoUser").then(user => {
      this.usuario = user.data;
    });
  }
  nextPage(){
    this.router.navigateByUrl('/categories/1/2');
  }
 
  loadSpecialInfo() {
    
  }
 
  logout() {
    this.authService.logout();
  }
 
  clearToken() {
    // ONLY FOR TESTING!
    this.storage.remove('access_token');
 
    let toast = this.toastController.create({
      message: 'JWT removed',
      duration: 3000
    });
    toast.then(toast => toast.present());
  }
 
}