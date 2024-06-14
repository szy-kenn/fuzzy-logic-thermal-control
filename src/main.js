import { HeaterCooler } from "./HeaterCooler";
import { ThermalFuzzyLogic } from "./ThermalFuzzyLogic";
import Trapmf from "./Trapmf";
import Trimf from "./Trimf";
import { Point } from "./utils";
import "./slider.css";

const startBtn = document.getElementById("startBtn");
const actualTempInput = document.getElementById("actualTemp");
const desiredTempInput = document.getElementById("desiredTemp");

const errorNeg = new Trapmf(Point(-4, 0), Point(-4, 1), Point(-2, 1), Point(0, 0));
const errorZero = new Trimf(Point(-2, 0), Point(0, 1), Point(2, 0));
const errorPos = new Trapmf(Point(0, 0), Point(2, 1), Point(4, 1), Point(4, 0));

const errorDotNeg = new Trapmf(Point(-10, 0), Point(-10, 1), Point(-5, 1), Point(0, 0));
const errorDotZero = new Trimf(Point(-5, 0), Point(0, 1), Point(5, 0));
const errorDotPos = new Trapmf(Point(0, 0), Point(5, 1), Point(10, 1), Point(10, 0));

const cooler = new Trapmf(Point(-100, 0), Point(-100, 1), Point(-50, 1), Point(0, 0));
const noChange = new Trimf(Point(-50, 0), Point(0, 1), Point(50, 0));
const heater = new Trapmf(Point(0, 0), Point(50, 1), Point(100, 1), Point(100, 0));

const fuzzyLogic = new ThermalFuzzyLogic(errorNeg, errorZero, errorPos, errorDotNeg, errorDotZero, errorDotPos, cooler, noChange, heater);
const heaterCooler = new HeaterCooler();

const calculateError = (desiredTemp, actualTemp) => desiredTemp - actualTemp;

const calculateErrorDot = (errorPrev, errorCurrent) => errorPrev - errorCurrent;

// get sliders elements
const tempValueSlider = document.getElementById("tempValueSlider");
const cloudCoverValueSlider = document.getElementById("cloudCoverValueSlider");

tempValueSlider.addEventListener("input", (e) => {
  const error = calculateError(cloudCoverValueSlider.value, e.target.value);
  fuzzyLogic.processInput(error, calculateErrorDot(error, error));
  document.querySelector(".temp-value-text").textContent = e.target.value;
});

cloudCoverValueSlider.addEventListener("input", (e) => {
  const error = calculateError(e.target.value, tempValueSlider.value);
  fuzzyLogic.processInput(error, calculateError(error, error));
  document.querySelector(".cloud-cover-value-text").textContent = e.target.value;
});

const randomizeBtn = document.querySelector(".btn-randomize");

randomizeBtn.addEventListener("click", () => {

  tempValueSlider.value = parseInt(Math.random(0, 1) * 110);
  cloudCoverValueSlider.value = parseInt(Math.random(0, 1) * 110);
  
  const evt = new Event("input");
  tempValueSlider.dispatchEvent(evt);
  cloudCoverValueSlider.dispatchEvent(evt);
});

fuzzyLogic.initialize();


const thermalControlCanvas = document.getElementById("thermalControlCanvas");
const ctx = thermalControlCanvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(100, 175);
ctx.lineTo(1100, 175);
ctx.strokeStyle = "white";
ctx.lineWidth = 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100, 325);
ctx.lineTo(1100, 325);
ctx.strokeStyle = "white";
ctx.lineWidth = 2;
ctx.stroke();

ctx.fillStyle = "#3b82f6";
ctx.fillRect(100, 100, 300, 300);

ctx.font = "24px Helvetica";
ctx.fillStyle = "white";
ctx.fillText("Thermal Control", 165, 260);

ctx.fillStyle = "#3b82f6";
ctx.fillRect(1100, 100, 300, 300);

ctx.font = "24px Helvetica";
ctx.fillStyle = "white";
ctx.fillText("Heater/Cooler", 1175, 260);
