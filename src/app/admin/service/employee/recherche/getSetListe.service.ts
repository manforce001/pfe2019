import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetSetListeService {
liste;
constructor() { }
get() {
  return this.liste;
}
set(liste) {
  this.liste = liste;
}
}
