import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAlumniComponent } from './dashboard-alumni.component';

describe('DashboardAlumniComponent', () => {
  let component: DashboardAlumniComponent;
  let fixture: ComponentFixture<DashboardAlumniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardAlumniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
