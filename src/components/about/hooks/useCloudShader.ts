/* eslint-disable */
import { useEffect, useRef } from "react";

type CameraControl = {
  pos: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
  roll: number;
};

export function useCloudShader(
  fragmentShaderSource: string,
  width = 640,
  height = 360
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cameraControl = useRef<CameraControl>({
    pos: { x: 0, y: 2, z: 0 }, // posição da câmera (mantém a altura y: 2)
    target: { x: -1, y: 2, z: -1 }, // olha para o sol na mesma altura
    roll: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL não suportado");
      return;
    }

    // Vertex shader simples com UV
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    function compileShader(type: number, source: string) {
      const shader = gl?.createShader(type)!;
      gl?.shaderSource(shader, source);
      gl?.compileShader(shader);
      if (!gl?.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl?.getShaderInfoLog(shader));
        gl?.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource)!;
    const fragmentShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      ${fragmentShaderSource}
    `
    )!;

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Buffer de posição
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const iResolutionLoc = gl.getUniformLocation(program, "iResolution");
    const iTimeLoc = gl.getUniformLocation(program, "iTime");
    const cameraPosLoc = gl.getUniformLocation(program, "cameraPos");
    const cameraTargetLoc = gl.getUniformLocation(program, "cameraTarget");
    const cameraRollLoc = gl.getUniformLocation(program, "cameraRoll");

    let startTime = performance.now();

    function render() {
      const now = performance.now();
      const time = (now - startTime) / 1000;

      if (canvas) {
        gl?.viewport(0, 0, canvas.width, canvas.height);
        gl?.uniform2f(iResolutionLoc, canvas.width, canvas.height);
        gl?.uniform1f(iTimeLoc, time);
      }

      // Passa câmera
      const cam = cameraControl.current;
      gl?.uniform3f(cameraPosLoc, cam.pos.x, cam.pos.y, cam.pos.z);
      gl?.uniform3f(cameraTargetLoc, cam.target.x, cam.target.y, cam.target.z);
      gl?.uniform1f(cameraRollLoc, cam.roll);

      gl?.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }

    render();
  }, [fragmentShaderSource, width, height]);

  return { canvasRef, cameraControl };
}
