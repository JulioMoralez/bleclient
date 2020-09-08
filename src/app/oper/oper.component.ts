import { Component, OnInit } from '@angular/core';
import {OperService} from '../service/oper';

@Component({
  selector: 'app-oper',
  templateUrl: './oper.component.html',
  styleUrls: ['./oper.component.css']
})
export class OperComponent implements OnInit {

  constructor(public operService: OperService) { }

  ngOnInit(): void {
  }

}
