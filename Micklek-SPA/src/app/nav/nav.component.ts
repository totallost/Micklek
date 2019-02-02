import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
  }

  collapse() {
    this.appComponent.tuggleSidebar();
  }

}
