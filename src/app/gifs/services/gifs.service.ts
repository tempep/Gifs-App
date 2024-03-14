import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsResponse } from '../interface/gifs-response.interface';


@Injectable({ providedIn: 'root' })
export class GifsService {

    public gifsList: Gif[] = [];

    private _tagsHistory: string[] = [];
    private apiKey: string = 'aTIqgy416xquqazpwCt48b3wCoTPKuCJ';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) {
        this.loadLocalStorage();
        this.loadSavedGifs();
        console.log('Gifs Service Ready!');
    }

    get tagsHistory() {
        return [...this._tagsHistory];
    }

    private organizeHistory(newTag: string): void {
        newTag = newTag.toLocaleLowerCase();

        if ( this._tagsHistory.includes(newTag) ) {
            this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== newTag );
        }

        this._tagsHistory.unshift(newTag);

        this._tagsHistory = this._tagsHistory.splice(0, 10);
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory))
    }

    private loadLocalStorage(): void {
        if( !localStorage.getItem('history') ) return;

        this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    }

    private loadSavedGifs(): void {
        if( this._tagsHistory.length === 0 ) return;
        
        const tag = this._tagsHistory[0];
        this.searchTag(tag);
    }

    searchTag(newTag: string): void {
        if( newTag.length === 0 ) return;
        this.organizeHistory(newTag);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', 10)
            .set('q', newTag)

        this.http.get<GifsResponse>(`${ this.serviceUrl }/search`, { params })
            .subscribe( resp => {
                this.gifsList = resp.data;
            })

    }

}