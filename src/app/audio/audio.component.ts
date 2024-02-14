import { Component, Injectable} from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})

@Injectable({providedIn:'root'})

export class AudioComponent {
  audio=new Audio();

  mout(){
    if(this.audio.muted){
      this.audio.muted=false;
      return true;
    }else{
      this.audio.muted=true;
      return false;
    }
  }

  start(){
    this.audio.loop=false;
    this.audio.src='../assets/audio/pacman-start.mp3';
    this.audio.play();
  }

  playing(){
    this.audio.src='../assets/audio/pacman-siren3.mp3';
    this.audio.play();
    this.audio.loop=true;
  }
}
