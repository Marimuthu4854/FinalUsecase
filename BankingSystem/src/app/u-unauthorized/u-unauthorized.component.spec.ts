import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UUnauthorizedComponent } from './u-unauthorized.component';

describe('UUnauthorizedComponent', () => {
  let component: UUnauthorizedComponent;
  let fixture: ComponentFixture<UUnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UUnauthorizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
