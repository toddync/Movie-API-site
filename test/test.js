document.addEventListener("mousemove", e => {
    var B = (e.clientX  - (screen.width / 2));
    var A = (e.clientY - (screen.height / 2)) * -1 ;
    //console.log("B = " + B);
    //console.log("A = " + A);

    var h = Math.sqrt((e.clientX ** 2) + (e.clientY ** 2));

    //console.log("C = " + h);

  //  console.log("Sen(@) = " + A/h )
/*let Ang = (Math.asin(A/h) * 180 ) / Math.PI;
if (Math.asin(A/h) < 0){
    Ang = Math.abs(Ang)+360;
}*/

var Ang = Math.atan2(A,B) * 180 / Math.PI;
if (Ang < 0){
    Ang = 360 - (Ang * -1)
}
    console.log("Ang = " + Ang);

    let AngCerto = Ang -90;

    document.querySelector(".quadrado").style.transform = `rotate(${-AngCerto}deg)`;
});