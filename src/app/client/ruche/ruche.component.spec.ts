/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RucheComponent } from './ruche.component';

describe('RucheComponent', () => {
  let component: RucheComponent;
  let fixture: ComponentFixture<RucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
