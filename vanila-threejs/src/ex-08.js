import * as THREE from 'three'
import { WEBGL } from './webgl'
// 조명 사용 스터디

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

    camera.position.set(0,5,10); // 카메라 위치 지정
    camera.lookAt(new THREE.Vector3(0,0,0)); // 카메라가 바라보는 방향 지정



    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 0.1, 1000);
    // camera.position.z = 3;

    // 렌더러
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 빛
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1); // (빛 색상, 세기)
    // scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF,0.5);
    directionalLight.position.set(1,1,1);
    const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5, 0xFFFF00); // 빛 쏘는 위치 표시기
    // scene.add(directionalLight);
    // scene.add(dlHelper)

    const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.3);
    // scene.add(hemisphereLight);

    const pointLight = new THREE.PointLight(0xFFFFFF, 0.5);
    const plHelper = new THREE.PointLightHelper(pointLight, 0.5);
    scene.add(pointLight);
    scene.add(plHelper);
    pointLight.position.set(-2,1,0.5);

    const pointLight2 = new THREE.PointLight(0xFFFF00, 0.5);
    const plHelper2 = new THREE.PointLightHelper(pointLight2, 0.5);
    scene.add(pointLight2);
    scene.add(plHelper2);
    pointLight2.position.set(2,2,2);

    const rectLight = new THREE.RectAreaLight(0xffffff,2, 2, 1);
    rectLight.position.set(-0.5,0.5, 1);
    rectLight.lookAt(0,0,0);
    scene.add(rectLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    // scene.add(spotLight);


    // 도형
    // const geometry = new THREE.BoxGeometry(1, 1,1);
    const geometry = new THREE.SphereGeometry(0.5, 32,16);
    const material01 = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
    })
    const obj01 = new THREE.Mesh(geometry, material01);
    obj01.rotation.y = 0.5;
    scene.add(obj01);

    // 바닥
    const planeGeometry = new THREE.PlaneGeometry(30,30,1,1);
    const planeMaterial = new THREE.MeshStandardMaterial({color: 0xEEEEEE});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -0.5;
    scene.add(plane);


    function render(time) {
        time *= 0.0005;  // convert time to seconds

        // obj01.rotation.x = time; // x축 회전
        // obj01.rotation.y = time; // y축 회전

        renderer.render(scene, camera);

        // 렌더링을 루프 시킬 때 사용하는 것
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);


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