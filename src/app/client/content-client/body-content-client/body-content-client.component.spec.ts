import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyContentClientComponent } from './body-content-client.component';

describe('BodyContentClientComponent', () => {
  let component: BodyContentClientComponent;
  let fixture: ComponentFixture<BodyContentClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyContentClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyContentClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
