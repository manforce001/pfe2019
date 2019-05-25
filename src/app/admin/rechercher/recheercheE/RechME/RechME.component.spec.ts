/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RechMEComponent } from './RechME.component';

describe('RechMEComponent', () => {
  let component: RechMEComponent;
  let fixture: ComponentFixture<RechMEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechMEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
