import {Component, Input} from "@angular/core";
import {Tweet} from "./data.service";

@Component({
    selector: "tweet-list",
    templateUrl: "/app/tweet-list.component.html"
})
export default class TweetList {
    @Input() private tweets: Array<Tweet>;
    private searchTerm = "";

    clearSearchTerm() {
        this.searchTerm = "";
    }
}