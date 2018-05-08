import * as THREE from 'three';

const Scene = {
  init(width, height) {
    this.setUpScene(width, height);
    this.setUpGeometry();
    return this;
  },
  setUpGeometry() {
    // const geo1 = new THREE.BoxGeometry(10, 10, 10);
    // const mat1 = new THREE.MeshBasicMaterial({ color: '#0475dc', wireframe: true });
    const mat2 = new THREE.LineBasicMaterial({ color: '#0475dc', linewidth: 1 });
    // const mat3 = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    // const thorus = new THREE.TorusGeometry(40, 1, 2, 50);
    // new THREE.LineSegments(new THREE.EdgesGeometry(thorus), mat2),

    const circle = new THREE.CircleGeometry(30, 32);
    this.circles = [
      new THREE.LineSegments(new THREE.EdgesGeometry(circle), mat2),
      new THREE.LineSegments(new THREE.EdgesGeometry(circle.clone()), mat2),
      new THREE.LineSegments(new THREE.EdgesGeometry(circle.clone()), mat2),
    ];

    const coreGeom = new THREE.SphereGeometry(5, 10, 10);
    this.core = new THREE.LineSegments(new THREE.EdgesGeometry(coreGeom), mat2);

    this.spheres = [this.core];
    // this.spheres = [
    //   new THREE.LineSegments(new THREE.EdgesGeometry(sphere1), mat2),
    //   new THREE.LineSegments(new THREE.EdgesGeometry(sphere2), mat2),
    //   new THREE.LineSegments(new THREE.EdgesGeometry(sphere3), mat2),
    // ];

    this.setUpObjectsPosition();

    this.spheres.concat(this.circles).forEach((el) => {
      this.scene.add(el);
    });

    // this.render.frame();
  },
  setUpScene(width, height) {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#FFF');
    this.renderer.setSize(width, height);

    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.x = 15;
    this.camera.position.y = 140;
    this.camera.position.z = 30;

    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    // controls.enableZoom = false;
  },
  setUpObjectsPosition() {
    //  this.circles[0].rotation.x = Math.PI / 40 * 12;
    this.circles[0].rotation.y = 0;
    this.circles[1].rotation.y = Math.PI / 3;
    this.circles[2].rotation.y = Math.PI / 3 * 2;

    // this.spheres[0].position = new THREE.Vector3(0, 1, 0);
    // this.spheres[0].translateX(5);
    // this.spheres[0].translate(0, 0, 10);
    // this.spheres[1].translateOnAxis(new THREE.Vector3(0, 1, 0), 5);
    // this.spheres[2].translate(10, 10, 0);
  },
  animate() {
    // this.pivots[0].rotation.z -= 0.002;
    this.circles[1].rotation.z -= 0.002;
    // this.spheres[1].translateOnAxis(new THREE.Vector3(0, 1, 0), 1);
    // console.log(this.object.rotation.y);
  },
  renderFrame() {
    this.animate();
    this.renderer.render(this.scene, this.camera);
  },
};

export default Scene;
