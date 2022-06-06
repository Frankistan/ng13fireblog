import { trigger, animate, transition, style, group, query } from '@angular/animations';

export const slideUp =
    trigger('slideUp', [

        transition(':enter', [

            // styles at start of transition
            style({ transform: 'translateY(100%)' }),

            // animation and styles at end of transition
            animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            animate('0.15s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(100%)' }))
        ]),
    ]);
