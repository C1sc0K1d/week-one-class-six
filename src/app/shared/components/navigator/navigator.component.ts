import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {

  // Output variables
  @Output() callModalEvent = new EventEmitter<void>();

  // Variables
  name: string = 'Login';

  seeDropdown: boolean = false;

  constructor(private router: Router, private cartService: CartService, private loginService: LoginService) { }

  // Functions
  ngOnInit(): void {
    // Check if the user name has been changed and update the value of the modal user name
    this.loginService.sendUserName.subscribe(login => this.name = login[0].toUpperCase() + login.substring(1).toLowerCase());
  }

  // Go to a page seted on the html
  goToPage(page: string): void {
    this.router.navigate([page]);
  }

  // Show or hide the dropdown menu
  showDropdown(): void {
    this.seeDropdown = !this.seeDropdown;;
  }

  // Filter the items by the type
  filterType(type: string) : void {
    this.cartService.setFilter(type);
  }

  // Show or hide the modal
  callModal() : void {
    this.callModalEvent.emit();
  }
}
