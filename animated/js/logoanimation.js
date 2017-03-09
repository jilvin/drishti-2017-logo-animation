
var scene;
var camera;
var renderer;

var status = 0;

//values -- start
//initial values -- start
var initialdae_rotation_y = 3.55;
var initialdae_rotation_x = 0.465;
var initialdae_rotation_z = -0.69;
//initial values -- end

//dae_position.set(0,0,0);//x,z,y- if you think in blender dimensions ;)
var nowdae_rotation_y = initialdae_rotation_y;
var nowdae_rotation_x = initialdae_rotation_x;
var nowdae_rotation_z = initialdae_rotation_z;
//now values -- end

//final values -- start
var finaldae_rotation_y = 0;
var finaldae_rotation_x = 0;
var finaldae_rotation_z = 0;
//final values -- end

var range = 100;
//var range = 4;

//div values -- start
var divdae_rotation_x = (finaldae_rotation_x - initialdae_rotation_x) / range;
var divdae_rotation_y = (finaldae_rotation_y - initialdae_rotation_y) / range;
var divdae_rotation_z = (finaldae_rotation_z - initialdae_rotation_z) / range;
//div values -- end
//values -- end

var dae;

function init() {
    "use strict";
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);
    //camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 10000);
    //camera.position.set(0,0,-30);
    camera = new THREE.OrthographicCamera(WIDTH / -2, WIDTH / 2, HEIGHT / 2, HEIGHT / -2, -500, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0;
    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
    scene.add(camera);
    window.addEventListener("resize", function () {
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });


    var light = new THREE.PointLight(0xfffff3, 0.8);
    light.position.set(-100, 100, 100);
    scene.add(light);
    var sphereSize = 1;
    var pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
    scene.add(pointLightHelper);
    var light2 = new THREE.PointLight(0xd7f0ff, 0.2);
    light2.position.set(400, 400, 200);
    scene.add(light2);
    //var sphereSize = 1;
    var pointLightHelper2 = new THREE.PointLightHelper(light2, sphereSize);
    scene.add(pointLightHelper2);
    var light3 = new THREE.PointLight(0xFFFFFF, 0.5);
    light3.position.set(300, 400, -200);
    scene.add(light3);
    //var sphereSize = 1;
    var pointLightHelper3 = new THREE.PointLightHelper(light3, sphereSize);
    scene.add(pointLightHelper3);
    var light4 = new THREE.PointLight(0xfffff3, 0.8);
    light4.position.set(-100, 200, -100);
    scene.add(light4);
    //var sphereSize = 1;
    var pointLightHelper4 = new THREE.PointLightHelper(light4, sphereSize);
    scene.add(pointLightHelper4);

    var light5 = new THREE.PointLight(0xfffff3, 0.8);
    light5.position.set(-600, 0, 0);
    scene.add(light5);
    //var sphereSize = 1;
    var pointLightHelper5 = new THREE.PointLightHelper(light5, sphereSize);
    scene.add(pointLightHelper5);
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load("models/pyraminx_centroid.dae", function (collada) {
        dae = collada.scene;
        //var skin = collada.skins[ 0 ];
        dae.position.set(0, 0, 0);//x,z,y- if you think in blender dimensions ;)
        dae.rotation.y = 3.55;
        dae.rotation.x = 0.465;
        dae.rotation.z = -0.69;
        dae.scale.set(300, 300, 300);
        scene.add(dae);
        var axes = new THREE.AxisHelper(1000);
        axes.position = dae.position;
        scene.add(axes);
        var gridXZ = new THREE.GridHelper(1000, 10);
        gridXZ.setColors(new THREE.Color(0x8f8f8f), new THREE.Color(0x8f8f8f));
        gridXZ.position.set(0, 0, 0);
        scene.add(gridXZ);
    });
}

function printnowfinal() {
    "use strict";
    //alert(nowcamera_rotation_y);
    //alert(finalcamera_rotation_y);
    //alert(divcamera_rotation_y);
}

function setvalues() {
    "use strict";
    //alert("I do set values!");
    dae.rotation.x = nowdae_rotation_x;
    dae.rotation.y = nowdae_rotation_y;
    dae.rotation.z = nowdae_rotation_z;

}

var r1;
var r2;
var r3;
var rsum;

//defined by jilvin -- start
function doanimation() {
    "use strict";
    //printnowfinal();
    r1=0;
    r2=0;
    r3=0;
    if (nowdae_rotation_z != finaldae_rotation_z && ((nowdae_rotation_z > (finaldae_rotation_z+0.001)) || (nowdae_rotation_z < (finaldae_rotation_z-0.001)))) {
        nowdae_rotation_z = nowdae_rotation_z + divdae_rotation_z;
        setvalues();
    }
    else {
        r1=1;
    }
    if (nowdae_rotation_y != finaldae_rotation_y && ((nowdae_rotation_y > (finaldae_rotation_y+0.001)) || (nowdae_rotation_y < (finaldae_rotation_y-0.001)))) {
        nowdae_rotation_y = nowdae_rotation_y + divdae_rotation_y;
        setvalues();
    }
    else {
        r2=1;
    }
    if (nowdae_rotation_x != finaldae_rotation_x && ((nowdae_rotation_x > (finaldae_rotation_x+0.001)) || (nowdae_rotation_x < (finaldae_rotation_x-0.001)))) {
        nowdae_rotation_x = nowdae_rotation_x + divdae_rotation_x;
        setvalues();
    }
    else {
        r3=1;
    }
    rsum = r1 + r2 + r3;
    if (rsum == 3)
    {
      status = 1;
      //alert("values are " + nowdae_rotation_x + nowdae_rotation_y + nowdae_rotation_z);
      //alert("end of animation")
    }
}
//defined by jilvin -- end

var timer = 0;

function animate1() {
            if (timer <10) {
              requestAnimationFrame(animate1);
              renderer.render(scene, camera);
              timer = timer + 1;
            }
            else {
              //alert("i do exit");
            }
}

function animate2() {
    setTimeout(function() {
        "use strict";
        //alert("Current status is: " + status);
        if (status == 1) {
          //callscaling();
          //alert("status is 1 now");
        } else {
            requestAnimationFrame(animate2);
            doanimation();
            //scene.remove( dae );
            renderer.render(scene, camera);
        }
  }, 0.0001);
}

init();
animate1();

setTimeout(function() {
  animate2();
},1000)
