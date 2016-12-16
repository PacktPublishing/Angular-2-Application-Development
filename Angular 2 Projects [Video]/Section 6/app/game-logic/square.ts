export default class Square {
    private isValid: boolean;

    constructor(private row: number, private column: number) {
        this.isValid = this.isValidCoordinate(this.getRow()) && this.isValidCoordinate(this.getColumn());
    }

    isEquivalentTo(square: Square) {
        return square != undefined && this.row === square.row && this.column === square.column;
    }

    getRow() {
        return this.row;
    }

    getColumn() {
        return this.column;
    }

    getIsValid() {
        return this.isValid 
    }

    private isValidCoordinate(coordinate: number) {
        return coordinate >= 0 && coordinate <= 7;
    }
}