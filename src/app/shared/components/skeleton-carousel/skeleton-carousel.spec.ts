import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCarousel } from './skeleton-carousel';

describe('SkeletonCarousel', () => {
  let component: SkeletonCarousel;
  let fixture: ComponentFixture<SkeletonCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
