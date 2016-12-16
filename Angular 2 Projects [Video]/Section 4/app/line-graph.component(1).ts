import {Component, ElementRef, Input, AfterViewInit, ViewChild} from "@angular/core";
import * as Chart from "chart.js";

@Component({
    selector: "line-graph",
    templateUrl: "/app/graph.component.html"
})
export default class AppComponent implements AfterViewInit {
    @ViewChild("canvas") private canvas: ElementRef;
    @Input() private data: Array<number>;

    ngAfterViewInit() {
        const chart = new Chart(this.canvas.nativeElement.getContext("2d"), {
            type: "line",
            data: {
                labels: this.data,
                datasets: [
                    {
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.data,
                        spanGaps: false
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        setInterval(function () {
            (chart as any).update();
        }, 1000);
    }
}