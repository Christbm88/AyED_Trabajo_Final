const width = 500; //250;
const height = 500; //200;

function setup() {

    let kdTreeCanvas = createCanvas(width, height);
    kdTreeCanvas.parent("KdTreeCanvas");

    background(0);
    for (let x = 0; x < width; x += width / 10) {
        for (let y = 0; y < height; y += height / 10) {
            stroke(125, 125, 125);
            strokeWeight(1);
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }
//pregunta 3
  /*  let data = [];
    
    for (let i = 0; i < 12; i++) {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * height);
        data.push([x, y]);

        fill(255, 255, 255);
        circle(x, height - y, 7); // 200 -y para q se dibuje apropiadamente
        textSize(12);
        text(x + ',' + y, x + 5, height - y);// 200 -y para q se dibuje apropiadamente
    }
*/
//fin pregunta 3

//pregunta 4
  /*  var data = [
        [40 ,70] ,
        [70 ,130] ,
        [90 ,40] ,
        [110 , 100] ,
        [140 ,110] ,
        [160 , 100]
    ];
    
    var point = [140 ,90]; // query
    
    data.forEach(element => {   
        fill(255, 255, 255);
            circle(element[0], height - element[1], 7); 
            textSize(12);
            text(element[0] + ',' + element[1], element[0] + 5, height - element[1]);

    });*/
//fin pregunta 4
//preguna 6
var data = [
	[40 ,70] ,
	[70 ,130] ,
	[90 ,40] ,
	[110 , 100] ,
	[140 ,110] ,
	[160 , 100] ,
	[150 , 30]
];

var point = [140 ,90];
data.forEach(element => {   
    fill(255, 255, 255);
        circle(element[0], height - element[1], 7); 
        textSize(12);
        text(element[0] + ',' + element[1], element[0] + 5, height - element[1]);

}); 
//fin pregunta 6


    let root = build_kdtree(data);
    //pregunta 5 y 6
    closest_point_brute_force ( data , point ) 
    //naive_closest_point  ( data , point ) 
    //fin pregunta 5 y 6
    drawGraph(generate_dot(root));
    //console.log(root);
}