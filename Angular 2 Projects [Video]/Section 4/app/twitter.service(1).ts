import {Inject, Injectable} from "@angular/core";
import {IoToken} from "./di";
import {Observable, Observer} from "rxjs";

@Injectable()
export default class TwitterService {
    private socket: SocketIOClient.Socket;
    private streamingEndpoint = "localhost:8002";

    constructor(@Inject(IoToken) private io: SocketIOClientStatic) {}

    startStreaming() {
        if (this.socket == undefined) {
            this.socket = this.io.connect(this.streamingEndpoint);
        }

        if (!this.socket.connected) {
            this.socket.connect();
        }

        const tweets = Observable.create((observer: Observer<Twitter.Status>) => {
            this.socket.on("tweet", (tweet: Twitter.Status) => {
                if (tweet.lang === "en") {
                    observer.next(tweet);
                }
            });
        });

        this.socket.emit("stream");
        return tweets;
    }

    stopStreaming() {
        this.socket.disconnect();
    }
}