//our root app component
import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2'

@Component({
  selector: 'page'
})
@View({
  templateUrl: 'views/home.html',
  // directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class App {
    
}