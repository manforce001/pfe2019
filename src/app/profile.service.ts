import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
profile;
constructor() { }
get() {
  return this.profile;
}
set(profile) {
  this.profile = profile;
}

}
