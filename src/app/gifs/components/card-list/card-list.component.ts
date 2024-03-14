import { Component, Input } from '@angular/core';
import { Gif } from '../../interface/gifs-response.interface';

@Component({
    selector: 'gifs-card-list',
    templateUrl: './card-list.component.html'
})

export class CardListComponent  {
    
    @Input()
    public gifs: Gif[] = [];

}