import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public stateSalesVolume:string = 'active';
  public stateLatestOrders:string = '';
  public stateServerControl:string = '';

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        //calls this stuff when navigation ends

        if(event.url == "/sales")
        {
          this.stateSalesVolume = 'active';
          this.stateLatestOrders = '';
          this.stateServerControl = '';
        }
        if(event.url == "/orders")
        {
          this.stateSalesVolume = '';
          this.stateLatestOrders = 'active';
          this.stateServerControl = '';
        }
        if(event.url == "/servers")
        {
          this.stateSalesVolume = '';
          this.stateLatestOrders = '';
          this.stateServerControl = 'active';
        }
    }
    })

  }

}
