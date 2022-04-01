import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  signup(event: Event) {
    // console.log('work')
    event.preventDefault()
    this.router.navigate(['signup'])
  }

  login(event: Event) {
    // console.log('work')
    event.preventDefault()
    this.router.navigate(['/admin', 'login'])
  }

}
