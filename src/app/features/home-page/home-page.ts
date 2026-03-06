import { Component, OnInit, signal } from '@angular/core';
import { Banner } from '../../core/models/Banner';
import { delay, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarouselBanner } from '../../shared/components/carousel-banner/carousel-banner';
import { SkeletonCarousel } from '../../shared/components/skeleton-carousel/skeleton-carousel';

/** Set to a value in ms (e.g. 2500) to simulate slow API and see the skeleton loader. 0 = disabled. */
const SKELETON_DEBUG_DELAY_MS = 0;

@Component({
  selector: 'app-home-page',
  imports: [CarouselBanner, CommonModule, SkeletonCarousel],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePageComponent implements OnInit {


  $banners = signal<Banner[]>([]);

  ngOnInit() {
    this.mockAPICall().subscribe((banners) => {
      this.$banners.set(banners);
    });
  }

  mockAPICall(): Observable<Banner[]> {
    return of<Banner[]>([
      {
        id: 'dbf6686c-928d-40e5-9a16-2f73f479846f',
        title: 'WinzUp Loyalty Program',
        description: 'Get up to 35% in rewards: daily rakeback, weekly cashback and level-up bonuses',
        backgroundImage: 'assets/banners/bg/winzup-bg-mob.webp',
        mainImage: 'assets/banners/visual/winzup-visual-mob.png',
        buttonText: 'Join now',
        buttonLink: 'https://winz.io/en-ET/winzup',
      },
      {
        id: '82ee269e-b8c9-48bf-8d7c-1d985a0c1417',
        title: `Valentine's Fortune Drops`,
        description: 'Trigger random prizes and win a share of €30,000!',
        backgroundImage: 'assets/banners/bg/valentines-bg-mob.png',
        mainImage: 'assets/banners/visual/valentines-visual-mob.png',
        buttonText: 'Learn more',
        buttonLink: 'https://winz.io/en-ET/promotions/drops-wins-slots',
      },
      {
        id: '3a3bf134-0ab5-48a2-ab4a-eafa46b52df8',
        title: 'Wheel of Winz',
        description: 'Spin the wheel to win up to €10,000 weekly',
        backgroundImage: 'assets/banners/bg/wheel-bg-mob.webp',
        mainImage: 'assets/banners/visual/wheel-visual-mob.png',
        buttonText: 'Spin now',
        buttonLink: 'https://winz.io/en-ET/promotions/wheel-of-winz',
      },
    ]).pipe(delay(SKELETON_DEBUG_DELAY_MS));
  }

}
