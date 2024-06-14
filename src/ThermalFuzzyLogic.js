import { addTemperatureLineChart, addTemperatureBarChart, addCloudCoverChart, addCloudCoverBarChart, addSpeedChart } from "./charts";

export class ThermalFuzzyLogic {

    constructor(errorNeg, errorZero, errorPos, errorDotNeg, errorDotZero, errorDotPos, cooler, noChange, heater) {
        this.errorNeg = errorNeg;
        this.errorZero = errorZero;
        this.errorPos = errorPos;
        this.errorDotNeg = errorDotNeg;
        this.errorDotZero = errorDotZero;
        this.errorDotPos = errorDotPos;
        
        this.cooler = cooler;
        this.noChange = noChange;
        this.heater = heater;
    }

    #updateLineCharts = (temp, cloudCover) => {
        this.temperatureLineChart.options.plugins.annotation.annotations[0].xMin = parseInt(temp + 4);
        this.temperatureLineChart.options.plugins.annotation.annotations[0].xMax = parseInt(temp + 4);
        this.temperatureLineChart.update();
        console.log(cloudCover);
        this.cloudCoverChart.options.plugins.annotation.annotations[0].xMin = parseInt(cloudCover + 10);
        this.cloudCoverChart.options.plugins.annotation.annotations[0].xMax = parseInt(cloudCover + 10);
        this.cloudCoverChart.update();
    }

    #updateBarCharts = (fuzzyT, fuzzyCC) => {
        this.temperatureBarChart.data.datasets[0].data = fuzzyT;
        this.temperatureBarChart.update();

        this.cloudCoverBarChart.data.datasets[0].data = fuzzyCC;
        this.cloudCoverBarChart.update();
    }

    #updateSpeedChart = (aggregatedValues) => {
        const ctx = document.getElementById("speedChart").getContext("2d");

        var gradient = ctx.createLinearGradient(0, 0, 0, parseInt(document.getElementById("speedChart").style.height));
        gradient.addColorStop(0, 'rgba(124, 58, 237,1)');   
        gradient.addColorStop(1, 'rgba(124, 58, 237,0)');

        this.speedChart.data.datasets[3] = {
            label: "Aggregated Values",
            data: aggregatedValues,
            fill: true,
            backgroundColor: gradient,
            borderColor: "rgba(124, 58, 237,1)",
            borderWidth: 5,
            pointColor: "#fff",
            pointStrokeColor: "#ff6c23",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "#ff6c23",
            order: 1,
            };

        this.speedChart.update('resize');
    }

    #setCenterOfGravity = (cog, cooler, noChange, heater) => {

        const output = [cooler, noChange, heater].indexOf(Math.max(cooler, noChange, heater)) === 0 ? "C" : noChange === 1 ? "NC" : "H";

        this.speedChart.options.plugins.annotation.annotations[0] = {
            type: "point",
            xValue: cog + 100,
            yValue: Math.max(cooler / 2, heater / 2, noChange / 2),
            backgroundColor: "#f87171",
            borderColor: "#f87171"
        };

        this.speedChart.options.plugins.annotation.annotations[1] = {
            type: "label",
            xValue: cog + 100,
            yValue: Math.max(cooler / 2, heater / 2, noChange / 2) + .075,
            color: "white",
            content: output,
            font: {
                size: 24,
                weight: "bold",
                family: "Roboto"
            },
        };

        this.speedChart.update();
    }

    initialize() {
        this.temperatureLineChart = addTemperatureLineChart(this.errorNeg, this.errorZero, this.errorPos);
        this.cloudCoverChart = addCloudCoverChart(this.errorDotNeg, this.errorDotZero, this.errorDotPos);
        this.speedChart = addSpeedChart(this.cooler, this.noChange, this.heater);

        // this.temperatureBarChart = addTemperatureBarChart([]);
        // this.cloudCoverBarChart = addCloudCoverBarChart([]);
    }

    processInput(errorVal, errorDotVal) {
        this.#updateLineCharts(errorVal, errorDotVal);

        const [fuzzyError, fuzzyErrorDot] = this.fuzzify(errorVal, errorDotVal);
        // this.#updateBarCharts(fuzzyError, fuzzyErrorDot);

        const [cooler, noChange, heater] = this.applyRules(fuzzyError, fuzzyErrorDot);
        
        const aggregatedValues = this.aggregate(cooler, noChange, heater);
        this.#updateSpeedChart(aggregatedValues);

        const cog = this.defuzzify(aggregatedValues);
        this.#setCenterOfGravity(cog, cooler, noChange, heater);
    }

    fuzzify(errorVal, errorDotVal) {
        const errorFuzzified = [
            parseFloat(this.errorNeg.calculate(errorVal)),
            parseFloat(this.errorZero.calculate(errorVal)),
            parseFloat(this.errorPos.calculate(errorVal)),
        ];

        const errorDotFuzzified = [
            parseFloat(this.errorDotNeg.calculate(errorDotVal)),
            parseFloat(this.errorDotZero.calculate(errorDotVal)),
            parseFloat(this.errorDotPos.calculate(errorDotVal))
        ];

        return [errorFuzzified, errorDotFuzzified];
    };

    applyRules(errorFuzzified, errorDotFuzzified) {

        const rules = {
            "PP": "H",
            "PZ": "H",
            "PN": "H",
            "ZP": "C",
            "ZZ": "NC",
            "ZN": "H",
            "NP": "C",
            "NZ": "C",
            "NN": "C"
        };

        const pp = Math.min(errorFuzzified[2], errorDotFuzzified[2]);
        const pz = Math.min(errorFuzzified[2], errorDotFuzzified[1]);
        const pn = Math.min(errorFuzzified[2], errorDotFuzzified[0]);

        const zp = Math.min(errorFuzzified[1], errorDotFuzzified[2]);
        const zz = Math.min(errorFuzzified[1], errorDotFuzzified[1]);
        const zn = Math.min(errorFuzzified[1], errorDotFuzzified[0]);

        const np = Math.min(errorFuzzified[0], errorDotFuzzified[2]);
        const nz = Math.min(errorFuzzified[0], errorDotFuzzified[1]);
        const nn = Math.min(errorFuzzified[0], errorDotFuzzified[0]);

        const appliedRules = [pp, pz, pn, zn, zp, np, nz, nn, zz];

        const heater =  Math.max(Math.max(appliedRules[0], appliedRules[1]), appliedRules[2], appliedRules[3]);
        const cooler =  Math.max(Math.max(appliedRules[4]), appliedRules[5], appliedRules[6], appliedRules[7]);
        const noChange = appliedRules[8];

        return [cooler, noChange, heater];
    };

    aggregate(cooler, noChange, heater) {
        return Array.from({length: 201}, (_, i) => 
            Math.max(Math.min(this.cooler.calculate(i - 100), cooler), Math.min(this.noChange.calculate(i - 100), noChange), Math.min(this.heater.calculate(i - 100), heater))
        );
    };

    defuzzify(aggregatedValues) {
        let sumY = 0;
        let sumXY = 0;

        for (let i = 0; i < aggregatedValues.length; i++) {
            sumY += parseFloat(aggregatedValues[i]);
            sumXY += ((i - 100) * parseFloat(aggregatedValues[i]));
        }
        return (parseFloat(sumXY) / parseFloat(sumY));
    };

}
