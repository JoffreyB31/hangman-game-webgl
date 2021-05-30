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
    gridColor: 0x536480,
    node: undefined,
    nodeRatio: 0,
    nodeHeight: 0,
    nodeWidth: 0,
    meshs: {},
    renderer: undefined,
    camera: undefined,
    scene: undefined,
  }),

  props: {
    counter: { type: Number, default: 0 },
  },

  computed: {
    activeLocale() {
      return this.$i18n.locale;
    },
  },

  watch: {
    counter(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateHangman();
      }
    },
    activeLocale(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setGameNameText();
      }
    },
  },

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
    updateHangman() {
      switch (this.counter) {
        case 0:
          this.resetObjectsVisibility();
          break;
        case 1:
          this.meshs.base.visible = true;
          break;
        case 2:
          this.meshs.leftBar.visible = true;
          break;
        case 3:
          this.meshs.top.visible = true;
          break;
        case 4:
          this.meshs.head.visible = true;
          break;
        case 5:
          this.meshs.body.visible = true;
          break;
        case 6:
          this.meshs.armRigth.visible = true;
          this.meshs.armLeft.visible = true;
          break;
        case 7:
          this.meshs.legRigth.visible = true;
          this.meshs.legLeft.visible = true;
          break;
      }
    },

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

      this.renderer.shadowMap.enabled = true;

      // const grid = new THREE.GridHelper(100, 10, this.gridColor, this.gridColor);
      // this.scene.add(grid);

      this.setGameNameText();
    },

    setGameNameText() {
      if (this.meshs.gameName) {
        this.scene.remove(this.meshs.gameName);
      }

      const loader = new THREE.FontLoader();
      loader.load("fonts/open_sans_regular.json", (font) => {
        const gameName = new THREE.TextGeometry(this.$t("hangman"), {
          font: font,
          size: 8,
          height: 2,
        });
        this.meshs.gameName = new THREE.Mesh(
          gameName,
          new THREE.MeshPhongMaterial({ color: this.gridColor })
        );
        this.meshs.gameName.position.set(-35, 20, 20);
        this.rotateObject(this.meshs.gameName, 0, 45, 0);
        this.scene.add(this.meshs.gameName);
      });
    },

    setCamera() {
      const fov = 60;
      this.camera = new THREE.PerspectiveCamera(fov, this.nodeRatio, 0.1, 1000);
      this.camera.position.set(25, 23, 22);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.addEventListener("change", this.render);
      // Override the camera target
      this.controls.target = new THREE.Vector3(0, 18, 0);

      // const cameraHelper = new THREE.CameraHelper(this.camera);
      // this.scene.add(cameraHelper);
    },

    setLights() {
      const light = new THREE.DirectionalLight(0x404040, 4);
      light.position.set(0, 200, 200);
      light.target.position.set(0, 2, 0);
      this.scene.add(light);

      const ambientLight = new THREE.AmbientLight(0x404040, 2);
      this.scene.add(ambientLight);
    },

    setHangman() {
      this.meshs.base = this.createBox(10, 2.5, 2.5, -10, 0, 0);
      this.meshs.leftBar = this.createBox(2.5, 30, 2.5, -10, 15, 0);
      this.meshs.top = this.createBox(25, 2.5, 2.5, 0, 30, 0);
      this.meshs.head = this.createSphere(4, 32, 32, 10, 25, 0, this.hangmanColor);
      this.meshs.body = this.createBox(2.5, 10, 2.5, 10, 17, 0, this.hangmanColor);
      this.meshs.armRigth = this.createBox(2.5, 7, 2.5, 7, 18, 0, this.hangmanColor);
      this.meshs.armLeft = this.createBox(2.5, 7, 2.5, 13, 18, 0, this.hangmanColor);
      this.meshs.legRigth = this.createBox(2.5, 7, 2.5, 7, 10, 0, this.hangmanColor);
      this.meshs.legLeft = this.createBox(2.5, 7, 2.5, 13, 10, 0, this.hangmanColor);
      this.rotateObject(this.meshs.armRigth, 0, 0, -45);
      this.rotateObject(this.meshs.armLeft, 0, 0, 45);
      this.rotateObject(this.meshs.legRigth, 0, 0, -45);
      this.rotateObject(this.meshs.legLeft, 0, 0, 45);

      this.resetObjectsVisibility();

      this.scene.add(this.meshs.base);
      this.scene.add(this.meshs.leftBar);
      this.scene.add(this.meshs.top);
      this.scene.add(this.meshs.head);
      this.scene.add(this.meshs.body);
      this.scene.add(this.meshs.armRigth);
      this.scene.add(this.meshs.armLeft);
      this.scene.add(this.meshs.legRigth);
      this.scene.add(this.meshs.legLeft);
    },

    resetObjectsVisibility() {
      for (const meshName in this.meshs) {
        this.meshs[meshName].visible = false;
      }
    },

    rotateObject(obj, X = 0, Y = 0, Z = 0) {
      obj.rotateX(THREE.Math.degToRad(X));
      obj.rotateY(THREE.Math.degToRad(Y));
      obj.rotateZ(THREE.Math.degToRad(Z));
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
      const material = new THREE.MeshStandardMaterial({ color });
      const mesh = new THREE.Mesh(geom, material);
      mesh.position.x = xPos;
      mesh.position.y = yPos;
      mesh.position.z = zPos;

      mesh.receiveShadow = true;
      mesh.castShadow = true;

      return mesh;
    },

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
  height: 250px;
  width: 100%;
  display: block;
}
</style>
