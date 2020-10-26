import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuContentClientComponent } from './menu-content-client.component';

describe('MenuContentClientComponent', () => {
  let component: MenuContentClientComponent;
  let fixture: ComponentFixture<MenuContentClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuContentClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuContentClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
