import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UprofilePage } from './uprofile.page';

describe('UprofilePage', () => {
  let component: UprofilePage;
  let fixture: ComponentFixture<UprofilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
