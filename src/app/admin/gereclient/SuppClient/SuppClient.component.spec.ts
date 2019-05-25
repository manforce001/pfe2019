/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SuppClientComponent } from './SuppClient.component';

describe('SuppClientComponent', () => {
  let component: SuppClientComponent;
  let fixture: ComponentFixture<SuppClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
