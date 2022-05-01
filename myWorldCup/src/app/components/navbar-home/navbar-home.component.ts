import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.sass']
})
export class NavbarHomeComponent implements OnInit {
  userLog: any;
  faUserCircle = faUserCircle;
  constructor() { 
    this.userLog = localStorage.getItem('user');
  }

  ngOnInit(): void {
  }

}
