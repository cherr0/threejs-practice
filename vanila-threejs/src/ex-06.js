import * as THREE from 'three'
import { WEBGL } from './webgl'
// 재질(Texture) 사용 스터디

if (WEBGL.isWebGLAvailable()) {

    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // 카메라
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    // 렌더러
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 빛
    const pointLight = new THREE.PointLight(0xffffff, 1); // 빛 색상, 빛 세기
    pointLight.position.set(0,2,12);
    scene.add(pointLight)

    // 텍스쳐 추가
    const textureLoader = new THREE.TextureLoader();
    const textureBaseColor = textureLoader.load('../static/img/stone_basecolor.jpg');
    const textureNormalMap = textureLoader.load('../static/img/stone_normal.jpg');
    const textureHeightMap = textureLoader.load('../static/img/stone_height.png');
    const textureRoughnessMap = textureLoader.load('../static/img/stone_roughness.jpg');

    // 매쉬
    const geometry = new THREE.SphereGeometry(0.3, 32,16);
    const material01 = new THREE.MeshStandardMaterial({
        color: 0xEEEEEE,
        map: textureBaseColor,
    })
    const obj01 = new THREE.Mesh(geometry, material01);
    obj01.position.x = -2;
    scene.add(obj01);


    const material02 = new THREE.MeshStandardMaterial({
        color: 0xEEEEEE,
        normalMap: textureNormalMap
    })
    const obj02 = new THREE.Mesh(geometry,material02);
    obj02.position.x = -1;
    scene.add(obj02);

    const material03 = new THREE.MeshStandardMaterial({
        color: 0xEEEEEE,
        map: textureBaseColor,
        normalMap: textureNormalMap,
        displacementMap: textureHeightMap,
        displacementScale: 0.1
    })
    const obj03 = new THREE.Mesh(geometry,material03);
    obj03.position.x = 0;
    scene.add(obj03);

    const material04 = new THREE.MeshStandardMaterial({
        color: 0xEEEEEE,
        map: textureBaseColor,
        normalMap: textureNormalMap,
        displacementMap: textureHeightMap,
        displacementScale: 0.1,
        roughnessMap: textureRoughnessMap,
        roughness: 0.4
    })
    const obj04 = new THREE.Mesh(geometry,material04);
    obj04.position.x = 1;
    scene.add(obj04);

    function render(time) {
        time *= 0.0005;  // convert time to seconds

        obj01.rotation.x = time; // x축 회전
        obj01.rotation.y = time; // y축 회전
        obj02.rotation.x = time; // x축 회전
        obj02.rotation.y = time; // y축 회전
        obj03.rotation.x = time; // x축 회전
        obj03.rotation.y = time; // y축 회전
        obj04.rotation.x = time; // x축 회전
        obj04.rotation.y = time; // y축 회전

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