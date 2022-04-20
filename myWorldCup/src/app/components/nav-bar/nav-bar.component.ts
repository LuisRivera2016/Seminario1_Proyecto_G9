import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {
  faUserCircle = faUserCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
