export class HeaterCooler {

    constructor() {
        this.type;
    }

    updateTemp = (actualTemp, outputType) => {
        this.type = outputType;

        if (this.type === "H") {
            return actualTemp + 0.5;
        };

        if (this.type === "C") {
            return actualTemp - 0.5;
        };

        return actualTemp;

    }
}