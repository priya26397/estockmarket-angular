import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSectorComponent } from './view-sector.component';

describe('ViewSectorComponent', () => {
  let component: ViewSectorComponent;
  let fixture: ComponentFixture<ViewSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
