import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserLoginInfoComponent } from './new-user-login-info.component';

describe('NewUserLoginInfoComponent', () => {
  let component: NewUserLoginInfoComponent;
  let fixture: ComponentFixture<NewUserLoginInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserLoginInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserLoginInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
