import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {

    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

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

    // 빛
    const pointLight = new THREE.PointLight(0xffffff, 1); // 빛 색상, 빛 세기
    pointLight.position.set(0,2,12);
    scene.add(pointLight)

    // 매쉬
    const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
    const material01 = new THREE.MeshPhysicalMaterial({
        color: 0xFF7F00,
        clearcoat: 1,
        clearcoatRoughness: 0.1
    })
    const obj01 = new THREE.Mesh(geometry, material01);
    obj01.position.x = -2;
    scene.add(obj01);


    const material02 = new THREE.MeshStandardMaterial({
        color: 0xFF7F00,
        metalness: 0.6, // 금속 질감 (어두워짐)
        roughness: 0.4, // 거친 질감 (금속같은 느낌)
        // transparent: true,
        wireframe: true, // 와이어프레임 선 모양 표시
    })
    material02.opacity = 0.7 // 바깥에서도 지정 가능
    const obj02 = new THREE.Mesh(geometry,material02);
    obj02.position.x = -1;
    scene.add(obj02);

    const material03 = new THREE.MeshDepthMaterial({
        color: 0xFF7F00
    })
    const obj03 = new THREE.Mesh(geometry,material03);
    obj03.position.x = 0;
    scene.add(obj03);

    const material04 = new THREE.MeshLambertMaterial({
        color: 0xFF7F00,
    })
    const obj04 = new THREE.Mesh(geometry,material04);
    obj04.position.x = 1;
    scene.add(obj04);

    const material05 = new THREE.MeshPhongMaterial({
        color: 0xFF7F00,
        shininess: 60, // 광택
        specular: 0x004fff
    })
    const obj05 = new THREE.Mesh(geometry,material05);
    obj05.position.x = 2;
    scene.add(obj05);

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
        obj05.rotation.x = time; // x축 회전
        obj05.rotation.y = time; // y축 회전

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