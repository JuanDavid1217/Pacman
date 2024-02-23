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
  pacmanPosition={
    x:21,
    y:21
  }
  intervalo:any

  //-----GAME-----
  playing=false;
  sound=true;
  frameSize={
    width:0,
    height:0,
    top:0,
    left:0
  }

  //map 1,2,3 para paso, 0 para no paso 
  map=[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
       [0, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 0],
       [0, 2, 2, 0, 1, 1, 0, 2, 2, 2, 2, 2, 0, 1, 1, 0, 2, 2, 2, 0],
       [0, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 0],
       [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
       [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
       [0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0],
       [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

  map2=[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2],
       [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0],
       [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0],
       [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0],
       [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0],
       [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0],
       [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0],
       [2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

  ngOnInit(): void {
    var frameData=document.getElementById('frame')?.getBoundingClientRect()
    this.frameSize.width=frameData?.width??0
    this.frameSize.height=this.frameSize.width/2//frameData?.height
    this.frameSize.left=frameData?.left??0
    this.frameSize.top=frameData?.top??0
    this.pacmanPosition.x+=frameData?.x??0
    this.pacmanPosition.y+=frameData?.y??0
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

  comprobarMovimiento(x:number, y:number){
    let column=Math.floor((x-this.frameSize.left)/21)
    let row=Math.floor((y-this.frameSize.top)/21)
    if(this.map[row][column]!=0){
      return true;
    }else{
      return false;
    }
  }

  comer(x:number, y:number){
    let column=Math.floor((x-this.frameSize.left)/21)
    let row=Math.floor((y-this.frameSize.top)/21)
    if(this.map[row][column]==2){
      this.audio.eating()
      this.map[row][column]=1
      this.score+=100
    }
  }

  moverDerecha(position:any){
    if(this.comprobarMovimiento(position+21, this.pacmanPosition.y)){
      if(position<(this.frameSize.left+this.frameSize.width)-21){
        position+=1
      }else{
        position=this.frameSize.left
      }
      this.comer(position, this.pacmanPosition.y)
    }
    return position
  }

  moverIzquiera(position:any){
    if(this.comprobarMovimiento(position-1, this.pacmanPosition.y)){
      if(position>this.frameSize.left){
        position-=1
      }else{
        position=this.frameSize.left+this.frameSize.width-21
      }
      this.comer(position, this.pacmanPosition.y)
    }
    return position
  }

  moverUp(position:any){
    if(this.comprobarMovimiento(this.pacmanPosition.x, position-1)){
      if(position>this.frameSize.top){
        position-=1
      }
      this.comer(this.pacmanPosition.x, position)
    }
    return position
  }

  moverBottom(position:any){
    if(this.comprobarMovimiento(this.pacmanPosition.x, position+21)){
      if(position<(this.frameSize.top+this.frameSize.height)-21){
        position+=1
      }
      this.comer(this.pacmanPosition.x, position)
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
