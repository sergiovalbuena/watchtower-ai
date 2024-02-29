import { DetectedObject } from "@tensorflow-models/coco-ssd";

export function drawOnCanvas(
  mirrored: Boolean,
  predictions: DetectedObject[],
  ctx: CanvasRenderingContext2D | null | undefined
) {
  predictions.forEach((detectedObject: DetectedObject) => {
    const { class: name, bbox, score } = detectedObject;
    const [x, y, width, height] = bbox;

    if (ctx) {
      ctx.beginPath();

      //styhling
      ctx.fillStyle = name === "person" ? "green" : "red";
      ctx.globalAlpha = 0.4;

      mirrored
        ? ctx.roundRect(ctx.canvas.width - x, y, -width, height, 8)
        : ctx.roundRect(x, y, width, height, 8);

      ctx.fill();

      ctx.font = "12px Courier New";
      ctx.globalAlpha = 1;

      mirrored
        ? ctx.fillText(name, ctx.canvas.width - x - width, y)
        : ctx.fillText(name, x, y);
    }
  }); // Add closing parenthesis here
}
