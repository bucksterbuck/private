import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDashboardHeaderComponent } from './owner-dashboard-header.component';

describe('OwnerDashboardHeaderComponent', () => {
  let component: OwnerDashboardHeaderComponent;
  let fixture: ComponentFixture<OwnerDashboardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerDashboardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
