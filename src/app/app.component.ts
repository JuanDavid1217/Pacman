import { Component, Injectable, OnInit } from '@angular/core';
import { AudioComponent } from './audio/audio.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{

  constructor(private audio: AudioComponent){}

  title = 'pac-man';

  up=1;
  trying=["1", "2", "3"];
  score=0;

  playing=false;
  sound=true;

  position=0;

  pacman=document.addEventListener('keydown', (e)=>{
    if(this.playing){
      if(e.keyCode==37){
        this.position=1;
      }else if(e.keyCode==38){
        this.position=2;
      }else if(e.keyCode==39){
        this.position=3;
      }else if(e.keyCode==40){
        this.position=4;
      }
    }
    console.log(this.position);
  })

  start(){
    this.playing=false;
    this.position=0;
    this.audio.start();
    timer(5000).subscribe(()=>{
      if(!this.playing){
        this.playing=true;
        this.position=1;
      }
      this.audio.playing();
    })
  }

  mout(){
    this.sound=this.audio.mout();
  }
}
