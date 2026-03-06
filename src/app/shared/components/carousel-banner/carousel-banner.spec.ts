import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselBanner } from './carousel-banner';

describe('CarouselBanner', () => {
  let component: CarouselBanner;
  let fixture: ComponentFixture<CarouselBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
