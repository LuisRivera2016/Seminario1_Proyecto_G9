import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-back-menu',
  templateUrl: './back-menu.component.html',
  styleUrls: ['./back-menu.component.sass']
})
export class BackMenuComponent implements OnInit {
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  constructor() { }

  ngOnInit(): void {
  }

}
