import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingTasksComponent } from './ongoing-tasks.component';

describe('OngoingTasksComponent', () => {
  let component: OngoingTasksComponent;
  let fixture: ComponentFixture<OngoingTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
