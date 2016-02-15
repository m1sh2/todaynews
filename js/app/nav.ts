//our root app component
import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, NgFor} from 'angular2/core'
// import {Http} from 'angular2/http'
// import 'rxjs/Rx'
// import {Http} from '../libs/http'

@Component({
  selector: 'right'
})
@View({
  templateUrl: 'views/nav/nav.main.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class Nav {
  generation = 0;
  menuItems: Object[] = [];
  // http: Http;

    // .map(res => res.json())
    // .subscribe((categories) => {
    //   console.info(categories);
    // });

  constructor() {
    // console.info(Http);
    // Http.get('api.php?act=getCategories').subscribe((categories) => {
    //   console.info(categories);
    // });
    for (var i = 0; i < 5; i++) {
      this.addItem(false);
    }
  }

  addItem(updateGeneration: boolean) {
    if (updateGeneration) {
      this.generation++;
    }
    this.menuItems.push({
      'title': this._randomLetter(),
      'url': this._randomNumber(),
      'generation': this.generation,
      'value': ''
    });
  }

  move(idx: number, step: number) {
    this.generation++;
    var tmp = this.list[idx];
    tmp.generation = this.generation;
    this.list[idx] = this.list[idx - step];
    this.list[idx - step] = tmp;
    this.list[idx].generation = this.generation;
  }

  remove(idx: number) {
    this.generation++;
    this.list.splice(idx, 1);
  }

  _randomIndex(): number {
    return Math.floor(Math.random() * this.list.length);
  }

  _randomLetter(): string {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'][this._randomNumber()];
  }

  _randomNumber(): number {
    return Math.floor(Math.random() * 10);
  }
}