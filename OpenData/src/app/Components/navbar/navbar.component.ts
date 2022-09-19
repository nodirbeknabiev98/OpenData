import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  imgSrc:string = 'assets/images/logo.png';
  imgAlt: string = 'logo img'; 
  constructor() { }

  ngOnInit(): void {
  }

}
