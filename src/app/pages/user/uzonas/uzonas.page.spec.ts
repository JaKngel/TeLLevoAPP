import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UzonasPage } from './uzonas.page';

describe('UzonasPage', () => {
  let component: UzonasPage;
  let fixture: ComponentFixture<UzonasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UzonasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
