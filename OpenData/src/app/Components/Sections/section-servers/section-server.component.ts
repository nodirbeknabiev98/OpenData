import { Component, OnInit,OnDestroy } from '@angular/core';
import { timer } from 'rxjs';


import { ServerModel } from 'src/app/Models/ServerModel';
import { ServerMessageModel } from 'src/app/Models/ServerMessageModel';

import { ServerService } from 'src/app/Services/Server/server.service';



@Component({
  selector: 'app-section-server',
  templateUrl: './section-server.component.html',
  styleUrls: ['./section-server.component.css']
})
export class SectionServersComponent implements OnInit,OnDestroy{

  servers: ServerModel[] = [];
  timer$:any;
  
  constructor(private _serverService: ServerService) { }

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnDestroy(): void {
  }

  private refreshData():void{
    this._serverService.getServers().subscribe(res => {
      this.servers = res;
    })
  }

  updateServer(payload:ServerMessageModel):void{
    this.timer$ = timer(2000);
    
    this.timer$.subscribe(()=>{
      this._serverService.updateServer(payload).subscribe(res => {
        console.log("UPDATED");
        this.refreshData();
      })
    }
    );
  }
}
