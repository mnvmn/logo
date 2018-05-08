import * as THREE from 'three';

const Scene = {
  init(width, height) {
    const scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(15, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // const geo1 = new THREE.BoxGeometry(10, 10, 10);
    const geo2 = new THREE.TorusGeometry(10, 3, 16, 100);

    // const mat1 = new THREE.MeshBasicMaterial({ color: '#0475dc', wireframe: true });
    const mat2 = new THREE.LineBasicMaterial({ color: '#0475dc', linewidth: 1 });
    // const mat3 = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    const edges = new THREE.EdgesGeometry(geo2);
    this.object = new THREE.LineSegments(edges, mat2);

    renderer.setClearColor('#FFF');
    renderer.setSize(width, height);

    this.scene = scene;

    this.renderer = renderer;

    this.setUpCamera();
    this.setUpPosition();

    scene.add(this.object);

    return this;
  },
  setUpCamera() {
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.z = 100;
  },
  setUpPosition() {
    this.object.rotation.x = (Math.PI / 40) * 12;
  },
  animate() {
    this.object.rotation.z -= 0.002;
    // console.log(this.object.rotation.y);
  },
  renderFrame() {
    this.animate();
    this.renderer.render(this.scene, this.camera);
  },
};

export default Scene;
