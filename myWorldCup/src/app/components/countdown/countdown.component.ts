import { Component, OnInit } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.sass']
})
export class CountdownComponent implements OnInit {
  faClock = faClock;
  countDown = new Date("november 20, 2022 13:37:25").getTime();
  days: any;
  hours: any;
  minutes: any;
  t = setInterval(()=>{
    var now = new Date().getTime();
    var distance = this.countDown - now;
    this.days = Math.floor(distance/(1000*60*60*24));
    this.hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
    this.minutes = Math.floor((distance % (1000*60*60))/(1000*60));
    //var seconds = Math.floor((distance % (1000*60))/(1000));
    //this.demo = days + " days " + hours + " hours " + minutes + " minutes ";
  })
  constructor() { }


  ngOnInit(): void {
  }

}
