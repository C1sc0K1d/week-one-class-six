import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  // Functions
  ngOnInit() : void { }

  // Open a new window to the angular page
  goToUrl(): void {
    window.open('https://angular.io', '_blank');
  }
}
