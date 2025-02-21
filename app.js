import {setUpEventListeners} from "./utils/domUtils.js";
import {Graph} from "./graph/Graph.js";

export const canvas = document.getElementById("canvas");
// const canvasRect = canvas.getBoundingClientRect();
export const ctx = canvas.getContext("2d");
export const identifierInput = document.getElementById("nodeIdentifier");

const width = 500;
const height = 500;

canvas.width = width;
canvas.height = height;


export const nodeRadius = 9;

export const graph = new Graph();

setUpEventListeners(canvas);