/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RechARComponent } from './RechAR.component';

describe('RechARComponent', () => {
  let component: RechARComponent;
  let fixture: ComponentFixture<RechARComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechARComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
