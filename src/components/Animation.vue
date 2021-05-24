<template>
  <div id="renderer" ref="renderer" />
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "AnimationComponent",

  data: () => ({
    gallowColor: 0x2b2b2b,
    hangmanColor: 0x5a8dcc,
    node: undefined,
    nodeRatio: 0,
    nodeHeight: 0,
    nodeWidth: 0,
    renderer: undefined,
    camera: undefined,
    scene: undefined,
  }),

  mounted() {
    this.node = this.$refs.renderer;
    this.getNodeSize();

    this.setScene();
    this.setCamera();
    this.setLights();
    this.setHangman();

    this.animate();

    window.addEventListener("resize", this.resize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
    this.controls.removeEventListener("change", this.render);
  },

  methods: {
    getNodeSize() {
      const { width, height } = this.node.getBoundingClientRect();
      this.nodeWidth = width;
      this.nodeHeight = height;
      this.nodeRatio = width / height;
    },

    setScene() {
      this.scene = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(this.nodeWidth, this.nodeHeight);
      this.node.appendChild(this.renderer.domElement);

      const grid = new THREE.GridHelper(100, 5);
      this.scene.add(grid);
    },

    setCamera() {
      const fov = 45;
      this.camera = new THREE.PerspectiveCamera(fov, this.nodeRatio, 0.1, 1000);
      this.camera.position.set(45, 45, 45);
      // this.camera.up.set(0, 1, 0);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.addEventListener("change", this.render);
    },

    setLights() {
      const directionalLight = new THREE.DirectionalLight(0x404040, 4);
      directionalLight.position.set(0, 2000, 2000);
      directionalLight.target.position.set(0, 2, 0);
      this.scene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight(0x404040, 2);
      this.scene.add(ambientLight);
    },

    setHangman() {
      const base = this.createBox(10, 2.5, 2.5, -10, 0, 0);
      const leftBar = this.createBox(2.5, 30, 2.5, -10, 15, 0);
      const top = this.createBox(25, 2.5, 2.5, 0, 30, 0);
      const rightBar = this.createSphere(5, 32, 32, 0, 0, 0, this.hangmanColor);

      this.scene.add(base);
      this.scene.add(leftBar);
      this.scene.add(top);
      this.scene.add(rightBar);
    },

    createSphere(radius, wSegments, hSegments, xPos, yPos, zPos, _color) {
      const color = _color || this.gallowColor;
      const geom = new THREE.SphereGeometry(radius, wSegments, hSegments);
      return this.createMesh(geom, xPos, yPos, zPos, color);
    },

    createBox(sizeX, sizeY, sizeZ, xPos, yPos, zPos, _color) {
      const color = _color || this.gallowColor;
      const geom = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
      return this.createMesh(geom, xPos, yPos, zPos, color);
    },

    createMesh(geom, xPos, yPos, zPos, color) {
      const material = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(geom, material);
      mesh.position.x = xPos;
      mesh.position.y = yPos;
      mesh.position.z = zPos;

      return mesh;
    },

    // createBall() {
    //   const ballGeom = new THREE.SphereGeometry(5, 32, 32);
    //   const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    //   const ball = new THREE.Mesh(ballGeom, ballMaterial);
    //   ball.position.y = 13.3;

    //   this.scene.add(ball);
    // },

    // createTee() {
    //   const tee = new THREE.Object3D();
    //   const teeMat = new THREE.MeshPhongMaterial({ color: 0x0000ff });

    //   const stemGeom = new THREE.CylinderGeometry(0.9, 0.75, 7);
    //   const stem = new THREE.Mesh(stemGeom, teeMat);
    //   tee.add(stem);

    //   const bevelGeom = new THREE.CylinderGeometry(1.5, 0.9, 2);
    //   const bevel = new THREE.Mesh(bevelGeom, teeMat);
    //   bevel.position.y = 3.75;
    //   tee.add(bevel);

    //   const topGeom = new THREE.CylinderGeometry(1.5, 1.5, 0.25);
    //   const top = new THREE.Mesh(topGeom, teeMat);
    //   top.position.y = 4.875;
    //   tee.add(top);

    //   tee.position.y = 3.5;
    //   this.scene.add(tee);
    // },

    render() {
      this.renderer.render(this.scene, this.camera);
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.render();
    },
  },
};
</script>

<style lang="scss" scoped>
#renderer {
  height: 300px;
  width: 100%;
  display: block;
}
</style>
