import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'firstProject';
  constructor(private router:Router) {}
  change(){
    this.router.navigate(['signup'])
  }
  change3(){
    this.router.navigate(['signup'])
  }
}
