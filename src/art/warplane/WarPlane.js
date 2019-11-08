import React from 'react';
import warPlaneImg from "./warplane.jpg"


class WarPlane extends React.Component {
  constructor(props){
    super(props);
    this.canvasRef = React.createRef();
    this.draw = this.draw.bind(this);
    this.animate = this.animate.bind(this);
    this.img=null;
  }

  animate(){
    let canvasRef = this.canvasRef.current;
    let ctx = canvasRef.getContext('2d');
    ctx.drawImage(this.img, 0, 0,canvasRef.width,canvasRef.height);
    for(let i=0;i<200;i++){
      let x= (Math.random() * canvasRef.width/2);
      let y= (Math.random() * (50*(canvasRef.width/2 - x)/canvasRef.width)+20) + (canvasRef.height/2)-((25*(canvasRef.width/2 - x)/canvasRef.width)+20)
      let o = (-0.6*((canvasRef.width/2-x)/canvasRef.width))+0.6;
      ctx.beginPath();
      ctx.arc(x, y,Math.random()*2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = "rgba(206,160,40,"+o+")";
      ctx.fill();
    }
    // window.requestAnimationFrame(this.animate)

  }

  draw() {
    this.img = new Image();
    this.img.onload = this.animate;
    this.img.src = warPlaneImg;
  }


  render(){
    return (
        <canvas ref={this.canvasRef} style={{height:"100%",width:"100%"}}></canvas>
    );
  }
  componentDidMount(){
    this.draw();
  }
}

export default WarPlane;


