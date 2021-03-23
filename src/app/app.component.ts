import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userSessionHasRequested } from './auth/state/auth.actions';
import * as fromSharedSelector from './shared/state/shared.selectors';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Todo List';
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(fromSharedSelector.getIsLoading);
    this.store.dispatch(userSessionHasRequested());
  }
}
