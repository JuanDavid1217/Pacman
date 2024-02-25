import { Component, Injectable, Input } from '@angular/core';

@Component({
  selector: 'app-ghost',
  templateUrl: './ghost.component.html',
  styleUrls: ['./ghost.component.css']
})
@Injectable({providedIn:'root'})
export class GhostComponent {
  @Input()
  stated: boolean=true;
  ghost1={
    position:1,
    x:0,
    y:0
  }
  ghost2={
    position:2,
    x:0,
    y:0
  }
  ghost3={
    position:3,
    x:0,
    y:0
  }
  ghost4={
    position:4,
    x:0,
    y:0
  }
}
