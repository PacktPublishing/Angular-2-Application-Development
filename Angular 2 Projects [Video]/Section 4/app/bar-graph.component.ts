import {Component, ElementRef, Input, AfterViewInit, ViewChild} from "@angular/core";
import * as Chart from "chart.js";

@Component({
    selector: "bar-graph",
    templateUrl: "/app/graph.component.html"
})
export default class BarGraphComponent implements AfterViewInit {
    @ViewChild("canvas") private canvas: ElementRef;
    @Input() private data: Array<number>;
    @Input() private labels: Array<string>;

    ngAfterViewInit() {
        const chart = new Chart(this.canvas.nativeElement.getContext("2d"), {
            type: "bar",
            data: {
                labels: this.labels,
                datasets: [{
                    label: "Count",
                    data: this.data,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255,99,132,1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(255,99,132,1)",
                        "rgba(54, 162, 235, 1)"
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
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