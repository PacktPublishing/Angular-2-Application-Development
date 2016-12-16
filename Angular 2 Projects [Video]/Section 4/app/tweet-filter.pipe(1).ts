import {Pipe, PipeTransform} from "@angular/core";
import {Tweet} from "./data.service";

@Pipe({name: "tweetFilter"})
export default class TweetFilterPipe implements PipeTransform {
    transform(tweets: Array<Tweet>, filter: string) {
        filter = filter.toUpperCase();
        return filter == undefined || filter === "" ?
            tweets :
            tweets.filter(x => x.text.toUpperCase().indexOf(filter) !== -1);
    }
}