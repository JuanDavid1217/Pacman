import { Component, Injectable, OnInit } from '@angular/core';
import { AudioComponent } from './audio/audio.component';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(private audio: AudioComponent){}

  title = 'pac-man';

  //------PACMAN------
  up=1;
  trying=["1", "2", "3"];
  score=0;
  position=0;
  pacmanPosition:any={
    x:0,
    y:0
  }
  intervalo:any

  //-----GAME-----
  playing=false;
  sound=true;
  frameSize:any={
    width:0,
    height:0,
    top:0,
    left:0
  }

  ngOnInit(): void {
    var frameData=document.getElementById('frame')?.getBoundingClientRect()
    this.frameSize.width=frameData?.width
    this.frameSize.hight=frameData?.height
    this.frameSize.left=frameData?.left
    this.frameSize.top=frameData?.top
    this.pacmanPosition.x=frameData?.x
    this.pacmanPosition.y=frameData?.y
  }

  key=document.addEventListener('keydown', (e)=>{
    if(this.playing){
      if(e.keyCode==37 && this.position!=1){
        this.position=1;
        if(this.intervalo){
          this.intervalo.unsubscribe()
        }
        this.intervalo=interval(10).subscribe(()=>{
          this.pacmanPosition.x=this.moverIzquiera(this.pacmanPosition.x);
        })
        
      }else if(e.keyCode==38 && this.position!=2){
        this.position=2;
        if(this.intervalo){
          this.intervalo.unsubscribe()
        }
        this.intervalo=interval(10).subscribe(()=>{
          this.pacmanPosition.y=this.moverUp(this.pacmanPosition.y);
        })
      }else if(e.keyCode==39 && this.position!=3){
        this.position=3;
        if(this.intervalo){
          this.intervalo.unsubscribe()
        }
        this.intervalo=interval(10).subscribe(()=>{
          this.pacmanPosition.x=this.moverDerecha(this.pacmanPosition.x);
        })
      }else if(e.keyCode==40 && this.position!=4){
        this.position=4;
        if(this.intervalo){
          this.intervalo.unsubscribe()
        }
        this.intervalo=interval(10).subscribe(()=>{
          this.pacmanPosition.y=this.moverBottom(this.pacmanPosition.y);
        })
      }
    }
  })

  moverDerecha(position:any){
    if(position<(this.frameSize.left+this.frameSize.width)-21){
      position+=1
    }
    return position
  }

  moverIzquiera(position:any){
    if(position>this.frameSize.left){
      position-=1
    }
    return position
  }

  moverUp(position:any){
    if(position>this.frameSize.top){
      position-=1
    }
    return position
  }

  moverBottom(position:any){
    if(position<(this.frameSize.top+212)-21){
      position+=1
      console.log("down")
    }
    return position
  }

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
