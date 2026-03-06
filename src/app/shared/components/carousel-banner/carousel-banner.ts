import { Component, HostListener, Input, signal, computed, OnInit, inject, DestroyRef } from '@angular/core';
import { Banner } from '../../../core/models/Banner';
import { BehaviorSubject, timer, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const CHANGE_BANNER_THRESHOLD = 150;
const CHANGE_BANNER_INTERVAL = 5000;

@Component({
  selector: 'carousel-banner',
  imports: [],
  templateUrl: './carousel-banner.html',
  styleUrl: './carousel-banner.css',
})
export class CarouselBanner implements OnInit {

  @Input() banners: Banner[] = [];

  destroyRef = inject(DestroyRef);
  consumeTimer$ = new BehaviorSubject<boolean>(true);
  currentBannerIndex = signal<number>(0);
  startX = 0;
  endX = 0;
  isDragging = signal<boolean>(false);
  partialMovementPosition = signal<number>(0);

  ngOnInit() {
    this.consumeTimer$.pipe(
      switchMap((runTimer) =>
        runTimer ? timer(CHANGE_BANNER_INTERVAL) : EMPTY,
      ),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      this.changeBanner(this.currentBannerIndex() + 1);
    });
  }

  changeBanner(index: number): void {
    this.resetValues();

    const isOutOfBounds = index < 0 || index > this.banners.length - 1;
    if (isOutOfBounds) {
      this.currentBannerIndex.set(0);
      this.consumeTimer$.next(true);
      return;
    }

    this.currentBannerIndex.set(index);
    this.consumeTimer$.next(true);
  }

  resetValues(): void {
    this.startX = 0;
    this.endX = 0;
    this.isDragging.set(false);
    this.partialMovementPosition.set(0);
  }

  bannerOffset = computed(() => {
    const partialMovementPosition = this.partialMovementPosition() / 10;
    const offset = (this.currentBannerIndex() * 100) + (partialMovementPosition * -1);

    return `translateX(-${offset}%)`;
  });

  @HostListener('window:mousedown', ['$event'])
  @HostListener('window:touchstart', ['$event'])
  onWindowInteractionStart(event: TouchEvent | MouseEvent) {
    this.startX = event instanceof TouchEvent ? event.changedTouches[0].clientX : event.clientX;

    this.isDragging.set(true);
    this.partialMovementPosition.set(0);
    this.consumeTimer$.next(false);
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  onWindowInteractionMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging()) return;

    const clientX = event instanceof TouchEvent ? event.changedTouches[0].clientX : event.clientX;
    this.partialMovementPosition.set(clientX - this.startX);
  }

  @HostListener('window:mouseup', ['$event'])
  @HostListener('window:touchend', ['$event'])
  onWindowInteractionEnd(event: TouchEvent | MouseEvent) {
    this.consumeTimer$.next(true);
    this.endX = event instanceof TouchEvent ? event.changedTouches[0].clientX : event.clientX;
    const diffX = this.endX - this.startX;

    if (diffX > CHANGE_BANNER_THRESHOLD) {
      this.changeBanner(this.currentBannerIndex() - 1);
    }

    if (diffX < -CHANGE_BANNER_THRESHOLD) {
      this.changeBanner(this.currentBannerIndex() + 1);
    }

    this.resetValues();
  }

}
