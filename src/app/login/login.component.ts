import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: FormGroup;
  isSubmitted = false


  
  teste = {message:'', error:false}
  constructor(
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = this.fBuilder.group({
      email: ["",[Validators.email,Validators.required] ],
      password: ["",[Validators.min(2),Validators.required] ],
    });
  }

  ngOnInit(): void {
    console.log(this.user)
  }

  signIn() {
    this.isSubmitted=true
    console.log(this.user.controls)
    this.authService.signInUser(this.user.value).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        this.router.navigate(["/inicio"]);
      },
      (err) => {
        
        this.teste.message = err.error.message
        this.teste.error = err.error.error
        console.log(err.error)
      
      }
    );
  }

  
  
}

export class PizzaPartyComponent {}