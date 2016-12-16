import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import AppComponent from "./app.component";
import {HttpModule} from "@angular/http";
import BarGraphComponent from "./bar-graph.component";
import LineGraphComponent from "./line-graph.component";
import TweetListComponent from "./tweet-list.component";
import MomentPipe from "./moment.pipe";
import TweetFilterPipe from "./tweet-filter.pipe";
import TwitterService from "./twitter.service";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule],
    declarations: [AppComponent, BarGraphComponent, LineGraphComponent, TweetListComponent, MomentPipe, TweetFilterPipe],
    bootstrap: [AppComponent],
    providers: [TwitterService]
})
export class AppModule { }

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);