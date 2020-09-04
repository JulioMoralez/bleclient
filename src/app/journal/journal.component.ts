import {Component, OnInit} from '@angular/core';
import {BaseService, LOAD} from '../service/base.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  private load = LOAD.JOURNAL;

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
    this.baseService.loadFromBase(this.load);
  }


}
