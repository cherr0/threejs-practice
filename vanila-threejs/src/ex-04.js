import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {

    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x252525);

    // 카메라
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 렌더러
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 매쉬
    const boxGeometry = new THREE.BoxGeometry(1,1,1) // 박스 도형
    const coneGeometry = new THREE.ConeGeometry(0.7,1,8, 1 );
    const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 1);

    const material = new THREE.MeshStandardMaterial({
        color: '#668899',
    });





    const cube1 = new THREE.Mesh(boxGeometry, material);
    cube1.position.x = -4;
    const cube2 = new THREE.Mesh(coneGeometry, material);
    cube2.position.x = -2;
    const cube3 = new THREE.Mesh(icosahedronGeometry, material);

    const cube4 = new THREE.Mesh(boxGeometry, material);
    cube4.position.x = 2;

    scene.add(cube1);
    scene.add(cube2);
    scene.add(cube3);
    scene.add(cube4);

    function render(time) {
        time *= 0.0005;  // convert time to seconds

        cube1.rotation.x = time; // x축 회전
        cube1.rotation.y = time; // y축 회전
        cube2.rotation.x = time; // x축 회전
        cube2.rotation.y = time; // y축 회전
        cube3.rotation.x = time; // x축 회전
        cube3.rotation.y = time; // y축 회전
        cube4.rotation.x = time; // x축 회전
        cube4.rotation.y = time; // y축 회전

        renderer.render(scene, camera);

        // 렌더링을 루프 시킬 때 사용하는 것
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);


    // 반응형 처리
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight; // 크키에 따른 종횡비 업데이트
        camera.updateProjectionMatrix(); // 카메라 위치 업데이트
        renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 업데이트
    }

    window.addEventListener('resize', onWindowResize)

} else {
    const warning = WEBGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
}