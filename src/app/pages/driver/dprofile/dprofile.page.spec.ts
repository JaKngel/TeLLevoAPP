import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DprofilePage } from './dprofile.page';

describe('DprofilePage', () => {
  let component: DprofilePage;
  let fixture: ComponentFixture<DprofilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
