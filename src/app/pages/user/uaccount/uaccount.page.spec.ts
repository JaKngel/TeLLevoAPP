import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UaccountPage } from './uaccount.page';

describe('UaccountPage', () => {
  let component: UaccountPage;
  let fixture: ComponentFixture<UaccountPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
