import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDashboardFooterComponent } from './owner-dashboard-footer.component';

describe('OwnerDashboardFooterComponent', () => {
  let component: OwnerDashboardFooterComponent;
  let fixture: ComponentFixture<OwnerDashboardFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerDashboardFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDashboardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
