import PieceComponent from "./piece.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

let component: PieceComponent;
let fixture: ComponentFixture<PieceComponent>;
let htmlElement: HTMLElement;

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe("PieceComponent", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PieceComponent]
        });

        fixture = TestBed.createComponent(PieceComponent);
        component = fixture.componentInstance;
        htmlElement = fixture.nativeElement;
    });

    it("creates an html element", () => {
        expect(htmlElement).toBeDefined();
    });

    it("doesn't contain any text when the piece isn't kinged", () => {
        const innerText = htmlElement.innerText;
        expect(innerText).toBe("");
    });

    it("contains the king symbol when the piece is kinged", () => {
        component.isKinged = true;
        fixture.detectChanges();
        const innerText = htmlElement.innerText;
        expect(innerText).toBe("♕");
    });
});