import {animate, style, transition, trigger} from "@angular/animations";

export const smoothAppearing =
  trigger('smoothAppearing', [
    transition(':enter', [
      style({opacity: 0}),
      animate('1s', style({opacity: 1}))
    ])
  ]);

export const slideInOutLeftToRight =
  trigger('slideInOutLeftToRight', [
    transition(':enter', [
      style({transform: 'translateX(-10%)', opacity: 0}),
      animate('1s', style({transform: 'translateX(0%)', opacity: 1}))
    ]),
    transition(':leave', [
      animate('1s', style({transform: 'translateX(40%)', opacity: 0}))
    ])
  ]);

