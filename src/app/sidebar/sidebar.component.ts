import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  @ViewChild('sidenav') sidenav: any;
  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarToggle$.subscribe(() => {
      this.sidenav.toggle();
    }); 
  }

}
