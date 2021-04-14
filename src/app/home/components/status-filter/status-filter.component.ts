import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { filterAndSortOngoingTaskRequested } from 'src/app/core/store/todo/task.actions';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss'],
})
export class StatusFilterComponent implements OnInit {
  filterObj = {
    status: 'Not started',
    orderBy: 'desc',
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onFilterSubmit(): void {
    this.store.dispatch(
      filterAndSortOngoingTaskRequested({ filterObj: { ...this.filterObj } })
    );
  }
}
