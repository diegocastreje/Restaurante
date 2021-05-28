import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {

  public comida:boolean = true;
  public bebida:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  public activeComida(){
    this.comida = true;
    this.bebida = false;
  }

  public activeBebida(){
    this.bebida = true;
    this.comida = false;
  }
}
