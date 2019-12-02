import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // appName será passado como parâmetro pelo pai
  @Input() appName: string = '';

  constructor() { }

  ngOnInit() {
  }

}
