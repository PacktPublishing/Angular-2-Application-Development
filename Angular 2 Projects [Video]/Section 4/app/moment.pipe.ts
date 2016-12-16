import {Pipe, PipeTransform} from "@angular/core";
import {Moment} from "moment";

@Pipe({name: "moment"})
export default class MomentPipe implements PipeTransform {
    transform(moment: Moment) {
        return moment.format("llll");
    }
}