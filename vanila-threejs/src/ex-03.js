import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {

    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x252525);

    // 카메라
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 0.1, 1000);

    // 캔버스
    const canvas = document.querySelector('#ex-03');

    // 렌더러
    const renderer = new THREE.WebGLRenderer({canvas});
    /**
     * JS를 활용해 직접적으로 사이즈를 전달한 것이기에 Canvas 지정을 했다면 해당 태그에 크기 전달 가능
     */
    // renderer.setSize(window.innerWidth, window.innerHeight);

    /**
     * 렌더러를 바디 태그에 삽입
     */
    // document.body.appendChild(renderer.domElement);

    function render(time) {
        time *= 0.001;  // convert time to seconds

        cube.rotation.x = time;
        cube.rotation.y = time;

        renderer.render(scene, camera);

        // 렌더링을 루프 시킬 때 사용하는 것
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

} else {
    const warning = WEBGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
}