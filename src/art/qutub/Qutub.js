import React from "react";
import qutubImg from "./qutub.jpg";

class Qutub extends React.Component {
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

    var step = 10;

    for(var x = 0; x < canvasRef.width; x += step) {
      for(var y = 0; y < canvasRef.height; y+= step) {
        if(x<(canvasRef.width/2 )-0.5*y - step || x>(canvasRef.width/2 )+0.7*y + step){
          drawLine(x, y, step, step);  
        }  
      }
    }


    function drawLine(x, y, width, height) {
      var leftToRight = Math.random() >= 0.5;

      if(leftToRight) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y + height);    
      } else {
        ctx.moveTo(x + width, y);
        ctx.lineTo(x, y + height);
      }
    
      ctx.stroke();
    }
  }

  draw() {
    this.img = new Image();
    this.img.onload = this.animate;
    this.img.src = qutubImg;
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

export default Qutub;
