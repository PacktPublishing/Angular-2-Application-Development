import {Side} from "./side";
import {MoveDirection} from "./move-direction";

export default class Piece {
    private isKinged: boolean;
    private moveDirection: MoveDirection;

    constructor(private _side: Side, isKinged?: boolean) {
        this.isKinged = !!isKinged;
        this.moveDirection =
            this.isKinged ?
                MoveDirection.Both :
                this.getSide() === Side.Dark ?
                    MoveDirection.Forward :
                    MoveDirection.Backward;
    }

    getMoveDirection() {
        return this.moveDirection;            
    }

    getSide() {
        return this._side;
    }

    getIsKinged() {
        return this.isKinged;
    }
}