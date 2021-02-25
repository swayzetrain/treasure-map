import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroDialogBodyComponent } from './intro-dialog-body.component';

describe('IntroDialogBodyComponent', () => {
  let component: IntroDialogBodyComponent;
  let fixture: ComponentFixture<IntroDialogBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroDialogBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroDialogBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
