import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appRating]',
})
export class RatingDirective implements OnChanges {
  @Input('star') star: any;

  filledSVG = `  <svg
  class="flex-shrink-0 w-5 h-5 text-yellow-400"
  viewBox="0 0 20 20"
  fill="currentColor"
  aria-hidden="true"
>
  <path
    fill-rule="evenodd"
    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
    clip-rule="evenodd"
  />
</svg>`;

  emptySVG = `  <svg
class="flex-shrink-0 w-5 h-5 text-gray-300"
viewBox="0 0 20 20"
fill="currentColor"
aria-hidden="true"
>
<path
  fill-rule="evenodd"
  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
  clip-rule="evenodd"
/>
</svg>`;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.elementRef.nativeElement.innerHTML = '';
    if (changes['star'] && changes['star'].currentValue) {
      this.elementRef.nativeElement.style.display = 'flex';

      for (let i = 0; i < 5; i++) {
        this.elementRef.nativeElement.innerHTML +=
          i < this.star ? this.filledSVG : this.emptySVG;
          
      }
    }
  }
}
