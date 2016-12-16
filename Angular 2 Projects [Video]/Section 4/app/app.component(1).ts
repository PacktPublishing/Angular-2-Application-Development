import {Component, OnInit} from "@angular/core";
import * as io from "socket.io-client";
import {DataService} from "./data.service";
import TwitterService from "./twitter.service";
import {IoToken} from "./di";

@Component({
    providers: [DataService, TwitterService, {provide: IoToken, useValue: io}],
    selector: "app",
    templateUrl: "/app/app.component.html"
})
export default class AppComponent implements OnInit {
    topWords = this.data.topWords;
    topWordsCount = this.data.topWordsCount;
    topHashtags = this.data.topHashtags;
    topHashtagsCount = this.data.topHashtagsCount;
    tweets = this.data.tweets;
    tweetsOverTime = this.data.tweetsOverTime;

    getTweetCount = () => this.data.totalCount;

    constructor(private twitter: TwitterService, private data: DataService) {}

    ngOnInit() {
        this.data.setSource(this.twitter.startStreaming());
    }
}