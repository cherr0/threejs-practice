import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 화면 조절 스터디

if (WEBGL.isWebGLAvailable()) {

    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // 카메라
    const fov = 47; // 카메라 광각
    const aspect = window.innerWidth / window.innerHeight; // 종횡비
    const near = 0.1; // 보려고 하는 시작 거리
    const far = 100; // 보이는 최대 거리
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(0,2,10); // 카메라 위치 지정
    camera.lookAt(new THREE.Vector3(0,0,0)); // 카메라가 바라보는 방향 지정


    // 렌더러
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // 활성화하면 도형의 그림자가 생성됨
    document.body.appendChild(renderer.domElement);

    // OrbitControls 추가
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2; // 카메라 확대 최소치 지정
    controls.maxDistance = 6; // 카메라 확대 최대치 지정
    controls.maxPolarAngle = Math.PI / 2; // 아래 이동 각도 지정
    // controls.minPolarAngle = 15; // 위 이동 각도 지정

    // 빛
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3); // (빛 색상, 세기)
    ambientLight.castShadow = true; // 그림자 적용이 안되는 빛이라 안됨
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF,1);
    directionalLight.position.set(-1,1.2,3);
    const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5, 0xFFFF00); // 빛 쏘는 위치 표시기
    scene.add(directionalLight);
    scene.add(dlHelper);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024; // 그림자 가로 기준 해상도 조절
    directionalLight.shadow.mapSize.height = 1024; // 그림자 세로 기준 해상도 조절
    directionalLight.shadow.radius = 8;

    // 도형
    // const geometry = new THREE.BoxGeometry(1, 1,1);
    // const geometry = new THREE.SphereGeometry(0.5, 32,16);
    const geometry = new THREE.IcosahedronGeometry(0.5, 0);
    // const geometry = new THREE.ConeGeometry(0.4,0.7,6);

    const material01 = new THREE.MeshStandardMaterial({
        color: 0x004fff,
    });
    const cube = new THREE.Mesh(geometry, material01);
    cube.rotation.y = 0.5;
    cube.position.y = 0.5;
    cube.castShadow = true;
    scene.add(cube);

    // 바닥
    const planeGeometry = new THREE.PlaneGeometry(30,30,1,1);
    const planeMaterial = new THREE.MeshStandardMaterial({color: 0xEEEEEE});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -0.5;
    plane.receiveShadow = true;
    scene.add(plane);


    function animate() {
        requestAnimationFrame(animate);

        controls.update();

        renderer.render(scene,camera);
    }
    animate();


    // 반응형 처리
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight; // 크키에 따른 종횡비 업데이트
        camera.updateProjectionMatrix(); // 카메라 위치 업데이트 (카메라 관련 어떠한 값이 바뀌더라도 해당 함수 사용)
        renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 업데이트
    }

    window.addEventListener('resize', onWindowResize)

} else {
    const warning = WEBGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
}