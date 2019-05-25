/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RechSCComponent } from './RechSC.component';

describe('RechSCComponent', () => {
  let component: RechSCComponent;
  let fixture: ComponentFixture<RechSCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechSCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechSCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
