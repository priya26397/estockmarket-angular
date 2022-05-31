import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksGraphComponent } from './stocks-graph.component';

describe('StocksGraphComponent', () => {
  let component: StocksGraphComponent;
  let fixture: ComponentFixture<StocksGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
