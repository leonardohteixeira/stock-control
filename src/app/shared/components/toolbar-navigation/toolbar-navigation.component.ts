import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: []
})
export class ToolbarNavigationComponent {
  constructor(private cookie: CookieService, private Router: Router) {}

  handleLogout(): void {
    this.cookie.delete('USER_INFO');
    void this.Router.navigate(['/home']);
  }

}
