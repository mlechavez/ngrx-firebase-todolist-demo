import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertInfo } from 'src/app/core/models/alert.model';
import { AppState } from 'src/app/core/store/app.state';
import * as fromActions from '../../../core/store/shared/shared.actions';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() alertInfo: AlertInfo;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  fadeOut(): void {
    this.store.dispatch(fromActions.clearAlertInfoAction());
  }

  ngOnDestroy(): void {}
}
