import React from "react";
import budapestImg from "./budapest.jpg";

class Budapest extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.draw = this.draw.bind(this);
    this.animate = this.animate.bind(this);
    this.img = null;
  }

  animate() {
    let canvasRef = this.canvasRef.current;
    let ctx = canvasRef.getContext("2d");
    ctx.drawImage(this.img, 0, 0, canvasRef.width, canvasRef.height);

    var line,
      dot,
      odd = false,
      lines = [],
      gapW = canvasRef.width / 9,
      gapH = canvasRef.height / 9;

    for (var y = gapH / 2; y <= canvasRef.height; y += gapH) {
      odd = !odd;
      line = [];
      for (
        var x = gapW / 4;
        y < canvasRef.height / 3
          ? x <= canvasRef.width
          : x <= canvasRef.width / 3;
        x += gapW
      ) {
        dot = { x: x + (odd ? gapH / 2 : 0), y: y };
        line.push({
          x: x + (Math.random() * 0.8 - 0.4) * gapW + (odd ? gapH / 2 : 0),
          y: y + (Math.random() * 0.8 - 0.4) * gapH
        });
        line.push(dot);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, 2 * Math.PI, true);
        ctx.fill();
      }
      lines.push(line);
    }

    var dotLine;
    odd = true;

    for (y = 0; y < lines.length - 1; y++) {
      odd = !odd;
      dotLine = [];
      for (var i = 0; i < lines[y].length; i++) {
        dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
        dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
      }
      for (i = 0; i < dotLine.length - 2; i++) {
        try {
          drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
        } catch (msg) {}
      }
    }

    function drawTriangle(pointA, pointB, pointC) {
      ctx.beginPath();
      ctx.moveTo(pointA.x, pointA.y);
      ctx.lineTo(pointB.x, pointB.y);
      ctx.lineTo(pointC.x, pointC.y);
      ctx.lineTo(pointA.x, pointA.y);
      ctx.closePath();
      var gray = Math.floor(Math.random() * 16).toString(16);
      ctx.fillStyle = "#" + gray + gray + gray;
      ctx.fill();
      ctx.stroke();
    }
  }

  draw() {
    this.img = new Image();
    this.img.onload = this.animate;
    this.img.src = budapestImg;
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        style={{ height: "100%", width: "100%" }}
      ></canvas>
    );
  }
  componentDidMount() {
    this.draw();
  }
}

export default Budapest;
