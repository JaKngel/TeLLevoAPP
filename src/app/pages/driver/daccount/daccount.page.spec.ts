import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DaccountPage } from './daccount.page';

describe('DaccountPage', () => {
  let component: DaccountPage;
  let fixture: ComponentFixture<DaccountPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
