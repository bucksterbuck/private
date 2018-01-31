import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDashboardSidebarComponent } from './owner-dashboard-sidebar.component';

describe('OwnerDashboardSidebarComponent', () => {
  let component: OwnerDashboardSidebarComponent;
  let fixture: ComponentFixture<OwnerDashboardSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerDashboardSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDashboardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
