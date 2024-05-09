export const renderPredictions = (predictions, ctx)=>{

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    predictions.forEach((prediction) => {
        const [x, y, width, height] = prediction["bbox"];


        //bounding box
        ctx.strokeStyle = "rgb(0, 255, 255)";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);

        //fill the color
        ctx.fillStyle = "rgba(0, 255, 255, 0)";
        ctx.fillRect(x, y, width, height);

        //Draw the label Background
        ctx.fillStyle = "rgb(0, 255, 255)";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10);
        ctx.fillRect(x, y, textWidth+4, textHeight+4);

        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);

    });
}