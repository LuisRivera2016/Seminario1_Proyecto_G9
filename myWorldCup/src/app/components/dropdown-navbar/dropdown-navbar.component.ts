import { Component, Input, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dropdown-navbar',
  templateUrl: './dropdown-navbar.component.html',
  styleUrls: ['./dropdown-navbar.component.sass']
})
export class DropdownNavbarComponent implements OnInit {
  @Input() currentLog = ''
  private isOpen = '';
  faUserCircle = faUserCircle;
  constructor() { }

  ngOnInit(): void {
  }

  toggled(event: any) {
    if (event) {
        console.log('is open');
        this.isOpen = 'is open'
    } else {
      console.log('is closed');
      this.isOpen = 'is closed'
    }
  }

}
