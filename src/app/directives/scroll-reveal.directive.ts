import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements AfterViewInit {
  @Input() revealClass: string = 'reveal-active';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, this.revealClass);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(this.el.nativeElement);
  }
}
