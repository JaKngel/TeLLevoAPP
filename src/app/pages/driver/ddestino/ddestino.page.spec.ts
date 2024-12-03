import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DdestinoPage } from './ddestino.page';

describe('DdestinoPage', () => {
  let component: DdestinoPage;
  let fixture: ComponentFixture<DdestinoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DdestinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
