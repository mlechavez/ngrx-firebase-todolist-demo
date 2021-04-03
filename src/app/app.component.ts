import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userSessionHasRequested } from './auth/state/auth.actions';
import * as fromSharedSelector from './core/store/shared/shared.selectors';
import { AppState } from './core/store/app.state';

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
    this.loading$ = this.store.select(fromSharedSelector.selectIsLoading);
    this.store.dispatch(userSessionHasRequested());
  }
}
