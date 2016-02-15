//main entry point
import {bootstrap} from 'angular2/angular2'
import {App} from './app'
// import {Nav} from './nav'

bootstrap(App).catch(err => console.error(err));
// bootstrap(Nav)
//     .catch(err => console.error(err));