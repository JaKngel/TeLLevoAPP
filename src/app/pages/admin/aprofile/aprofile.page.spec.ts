import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AprofilePage } from './aprofile.page';

describe('AprofilePage', () => {
  let component: AprofilePage;
  let fixture: ComponentFixture<AprofilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
