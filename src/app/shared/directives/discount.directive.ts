import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDiscount]',
})
export class DiscountDirective implements AfterViewInit {
  endTime: any;
  currentTime: any;
  discountTime: any;
  @Input('dealEnds') dealEnds: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.endTime = new Date(this.dealEnds).getTime();
      this.change();
    }, 1000);
  }

  x = setInterval(() => {
    this.change();
  }, 1000);

  change() {
    this.currentTime = new Date().getTime();
    var distance = this.endTime - this.currentTime;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.discountTime =
      days + 'D ' + hours + 'H ' + minutes + 'M ' + seconds + 'S ';
    if (distance <= 0) {
      clearInterval(this.x);
    }

    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerText',
      this.discountTime
    );

    // this.el.nativeElement.style.backgroundColor = "red"

    // this.el.nativeElement.text = "hello this is directive"
    // this.renderer.setProperty(this.el.nativeElement, 'innerText', 'Hello, Directive!');
  }
}
