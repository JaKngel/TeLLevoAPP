import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UmapPage } from './umap.page';

describe('UmapPage', () => {
  let component: UmapPage;
  let fixture: ComponentFixture<UmapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
