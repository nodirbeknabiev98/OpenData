import { Component, OnInit} from '@angular/core';
import { Input,Output,EventEmitter } from '@angular/core';

import { ServerModel } from '../../Models/ServerModel';
import { ServerMessageModel } from '../../Models/ServerMessageModel';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  @Input() inputToServerComponent!: ServerModel ;
  @Output() serverAction = new EventEmitter<ServerMessageModel>();
  color:string = "";
  buttonText:string = "";
  serverStatus:string = "";
  isLoading!:boolean;
  constructor() { }

  ngOnInit(): void {
    this.setServerStatus(this.inputToServerComponent.isOnline);
  }

  setServerStatus(isOnline:boolean):void{
    if(isOnline)
    {
      this.inputToServerComponent.isOnline = true;
      this.serverStatus = "Online";
      this.color = "#66BB6A";
      this.buttonText = "Shut Down";
    }
    else{
      this.inputToServerComponent.isOnline =false;
      this.serverStatus = "Offline";
      this.color = "#FF6B6B";
      this.buttonText = "Start";
    }
  }


  makeLoading(){
    this.color = "#FFCA28";
    this.buttonText = "Pending....";
    this.isLoading = true;
    this.serverStatus = "Loading";
  }

  sendServerAction(isOnline:boolean){
    console.log("Send server action is called!!");
    this.makeLoading();
    const payload = this.buildPayload(isOnline);
    this.serverAction.emit(payload);
  }

  buildPayload(isOnline:boolean):ServerMessageModel{
    if(isOnline)
    {
      return{
        id:this.inputToServerComponent.id,
        payload: "deactivate"
      }
    }
    else{
      return{
        id:this.inputToServerComponent.id,
        payload: "activate"
      }

    }
  }
}
