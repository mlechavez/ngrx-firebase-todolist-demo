import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { signoutRequest } from 'src/app/core/store/auth/auth.actions';
import {
  getUser,
  isAuthenticated,
} from 'src/app/core/store/auth/auth.selectors';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/app.state';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss'],
})
export class SiteHeaderComponent implements OnInit {
  collapsed = true;
  isAuthenticated$: Observable<boolean>;
  user$: Observable<User>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
    this.user$ = this.store.select(getUser);
  }

  onSignout(event: Event): void {
    event.preventDefault();
    this.store.dispatch(signoutRequest());
  }
}
