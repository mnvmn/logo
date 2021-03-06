import * as THREE from 'three';

const Scene = {
  init(width, height) {
    this.setUpScene(width, height);
    this.setUpGeometry();
    this.setUpPositions();
    return this;
  },
  setUpGeometry() {
    const matWire = new THREE.LineBasicMaterial({ color: '#0475dc', linewidth: 1 });
    const circle = new THREE.CircleGeometry(30, 32);
    this.circles = [
      new THREE.LineSegments(new THREE.EdgesGeometry(circle), matWire),
      new THREE.LineSegments(new THREE.EdgesGeometry(circle.clone()), matWire),
      new THREE.LineSegments(new THREE.EdgesGeometry(circle.clone()), matWire),
    ];

    this.neutron = new THREE.Group();
    this.neutron.add(this.circles[0]);
    this.neutron.add(this.circles[1]);
    this.neutron.add(this.circles[2]);
    this.scene.add(this.neutron);

    this.sphere = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.SphereGeometry(5, 9, 9)),
      matWire,
    );

    [this.sphere, this.neutron].forEach((el) => {
      this.scene.add(el);
    });
  },
  setUpScene(width, height) {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#FFF');
    this.renderer.setSize(width, height);

    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 150;
  },
  setUpPositions() {
    this.circles[1].rotation.y = Math.PI / 4;
    this.circles[1].rotation.x = Math.PI / 3;
    this.circles[2].rotation.y = Math.PI / 3 * 2; // eslint-disable-line no-mixed-operators

    this.neutron.rotation.x = Math.PI / 5 * 2; // eslint-disable-line no-mixed-operators
    this.neutron.rotation.y = Math.PI / 4;
    this.neutron.rotation.z = Math.PI / 5;
  },
  animate() {
    // this.sphere.rotation.y -= 0.002;
    // this.neutron.rotation.x += 0.001;
    // this.neutron.rotation.y += 0.005;
  },
  renderFrame() {
    this.animate();
    this.renderer.render(this.scene, this.camera);
  },
};

export default Scene;
