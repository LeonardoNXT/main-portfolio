export const cloudsShader = `#ifdef GL_ES
precision highp float;
#endif

// 0: sunset look
// 1: bright look
#define LOOK 1

// 0: one 3d texture lookup
// 1: two 2d texture lookups with hardware interpolation
// 2: two 2d texture lookups with software interpolation
#define NOISE_METHOD 1

// 0: no LOD
// 1: yes LOD
#define USE_LOD 1

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform vec3 cameraPos;
uniform vec3 cameraTarget;
uniform float cameraRoll;

varying vec2 v_uv;

// Hash function para substituir texturas
float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

// Noise 3D procedural
float noise3d(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    
    return mix(
        mix(mix(hash(p + vec3(0,0,0)), hash(p + vec3(1,0,0)), f.x),
            mix(hash(p + vec3(0,1,0)), hash(p + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(p + vec3(0,0,1)), hash(p + vec3(1,0,1)), f.x),
            mix(hash(p + vec3(0,1,1)), hash(p + vec3(1,1,1)), f.x), f.y),
        f.z) * 2.0 - 1.0;
}

mat3 setCamera(in vec3 ro, in vec3 ta, float cr) {
    vec3 cw = normalize(ta - ro);
    vec3 cp = vec3(sin(cr), cos(cr), 0.0);
    vec3 cu = normalize(cross(cw, cp));
    vec3 cv = normalize(cross(cu, cw));
    return mat3(cu, cv, cw);
}

float noise(in vec3 x) {
    return noise3d(x);
}

#if LOOK==0
float map(in vec3 p, int oct) {
    vec3 q = p - vec3(0.0, 0.1, 1.0) * iTime;
    float g = 0.5 + 0.5 * noise(q * 0.3);
    
    float f;
    f = 0.50000 * noise(q); q = q * 2.02;
    #if USE_LOD==1
    if(oct >= 2)
    #endif
    f += 0.25000 * noise(q); q = q * 2.23;
    #if USE_LOD==1
    if(oct >= 3)
    #endif
    f += 0.12500 * noise(q); q = q * 2.41;
    #if USE_LOD==1
    if(oct >= 4)
    #endif
    f += 0.06250 * noise(q); q = q * 2.62;
    #if USE_LOD==1
    if(oct >= 5)
    #endif
    f += 0.03125 * noise(q);
    
    f = mix(f * 0.1 - 0.5, f, g * g);
    
    return 1.5 * f - 0.5 - p.y;
}

const int kDiv = 1;
const vec3 sundir = normalize(vec3(1.0, 0.0, -1.0));

vec4 raymarch(in vec3 ro, in vec3 rd, in vec3 bgcol, in ivec2 px) {
    // bounding planes
    const float yb = -3.0;
    const float yt = 0.6;
    float tb = (yb - ro.y) / rd.y;
    float tt = (yt - ro.y) / rd.y; // ✅ CORRIGIDO: era rd.t

    // find tightest possible raymarching segment
    float tmin, tmax;
    if(ro.y > yt) {
        // above top plane
        if(tt < 0.0) return vec4(0.0); // early exit
        tmin = tt;
        tmax = tb;
    } else {
        // inside clouds slabs
        tmin = 0.0;
        tmax = 60.0;
        if(tt > 0.0) tmax = min(tmax, tt);
        if(tb > 0.0) tmax = min(tmax, tb);
    }
    
    // dithered near distance (substituindo texelFetch por hash)
    float t = tmin + 0.1 * hash(vec3(float(px.x), float(px.y), iTime));
    
    // raymarch loop
    vec4 sum = vec4(0.0);
    for(int i = 0; i < 190 * kDiv; i++) {
        // step size
        float dt = max(0.05, 0.02 * t / float(kDiv));

        // lod
        #if USE_LOD==0
        const int oct = 5;
        #else
        int oct = 5 - int(log2(1.0 + t * 0.5));
        #endif
        
        // sample cloud
        vec3 pos = ro + t * rd;
        float den = map(pos, oct);
        if(den > 0.01) { // if inside
            // do lighting
            float dif = clamp((den - map(pos + 0.3 * sundir, oct)) / 0.25, 0.0, 1.0);
            vec3 lin = vec3(0.65, 0.65, 0.75) * 1.1 + 0.8 * vec3(1.0, 0.6, 0.3) * dif;
            vec4 col = vec4(mix(vec3(1.0, 0.93, 0.84), vec3(0.25, 0.3, 0.4), den), den);
            col.xyz *= lin;
            // fog
            col.xyz = mix(col.xyz, bgcol, 1.0 - exp2(-0.1 * t));
            // composite front to back
            col.w = min(col.w * 8.0 * dt, 1.0);
            col.rgb *= col.a;
            sum += col * (1.0 - sum.a);
        }
        // advance ray
        t += dt;
        // until far clip or full opacity
        if(t > tmax || sum.a > 0.99) break;
    }

    return clamp(sum, 0.0, 1.0);
}

vec4 render(in vec3 ro, in vec3 rd, in ivec2 px) {
    float sun = clamp(dot(sundir, rd), 0.0, 1.0);

    // background sky
    vec3 col = vec3(0.76, 0.75, 0.95);
    col -= 0.6 * vec3(0.90, 0.75, 0.95) * rd.y;
    col += 0.2 * vec3(1.00, 0.60, 0.10) * pow(sun, 8.0);

    // clouds
    vec4 res = raymarch(ro, rd, col, px);
    col = col * (1.0 - res.w) + res.xyz;
    
    // sun glare
    col += 0.2 * vec3(1.0, 0.4, 0.2) * pow(sun, 3.0);

    // tonemap
    col = smoothstep(0.15, 1.1, col);

    return vec4(col, 1.0);
}

#else

float map5(in vec3 p) {
    vec3 q = p - vec3(0.0, 0.1, 1.0) * iTime;
    float f;
    f = 0.50000 * noise(q); q = q * 2.02;
    f += 0.25000 * noise(q); q = q * 2.03;
    f += 0.12500 * noise(q); q = q * 2.01;
    f += 0.06250 * noise(q); q = q * 2.02;
    f += 0.03125 * noise(q);
    return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

float map4(in vec3 p) {
    vec3 q = p - vec3(0.0, 0.1, 1.0) * iTime;
    float f;
    f = 0.50000 * noise(q); q = q * 2.02;
    f += 0.25000 * noise(q); q = q * 2.03;
    f += 0.12500 * noise(q); q = q * 2.01;
    f += 0.06250 * noise(q);
    return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

float map3(in vec3 p) {
    vec3 q = p - vec3(0.0, 0.1, 1.0) * iTime;
    float f;
    f = 0.50000 * noise(q); q = q * 2.02;
    f += 0.25000 * noise(q); q = q * 2.03;
    f += 0.12500 * noise(q);
    return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

float map2(in vec3 p) {
    vec3 q = p - vec3(0.0, 0.1, 1.0) * iTime;
    float f;
    f = 0.50000 * noise(q); q = q * 2.02;
    f += 0.25000 * noise(q);
    return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

const vec3 sundir = vec3(-0.7071, 0.0, -0.7071);

vec4 raymarch(in vec3 ro, in vec3 rd, in vec3 bgcol, in ivec2 px) {
    vec4 sum = vec4(0.0);
    float t = 0.05 * hash(vec3(float(px.x), float(px.y), iTime));
    
    // Multi-pass rendering with different LODs
    // Pass 1: map5 (40 steps)
    for(int i = 0; i < 15; i++) {
        vec3 pos = ro + t * rd;
        if(pos.y < -3.0 || pos.y > 2.0 || sum.a > 0.99) break;
        float den = map5(pos);
        if(den > 0.01) {
            float dif = clamp((den - map5(pos + 0.3 * sundir)) / 0.6, 0.0, 1.0);
            vec3 lin = vec3(1.0, 0.6, 0.3) * dif + vec3(0.91, 0.98, 1.05);
            vec4 col = vec4(mix(vec3(1.0, 0.95, 0.8), vec3(0.25, 0.3, 0.35), den), den);
            col.xyz *= lin;
            col.xyz = mix(col.xyz, bgcol, 1.0 - exp(-0.003 * t * t));
            col.w *= 0.4;
            col.rgb *= col.a;
            sum += col * (1.0 - sum.a);
        }
        t += max(0.06, 0.05 * t);
    }
    
    // Pass 2: map4 (40 steps)
    for(int i = 0; i < 15; i++) {
        vec3 pos = ro + t * rd;
        if(pos.y < -3.0 || pos.y > 2.0 || sum.a > 0.99) break;
        float den = map4(pos);
        if(den > 0.01) {
            float dif = clamp((den - map4(pos + 0.3 * sundir)) / 0.6, 0.0, 1.0);
            vec3 lin = vec3(1.0, 0.6, 0.3) * dif + vec3(0.91, 0.98, 1.05);
            vec4 col = vec4(mix(vec3(1.0, 0.95, 0.8), vec3(0.25, 0.3, 0.35), den), den);
            col.xyz *= lin;
            col.xyz = mix(col.xyz, bgcol, 1.0 - exp(-0.003 * t * t));
            col.w *= 0.4;
            col.rgb *= col.a;
            sum += col * (1.0 - sum.a);
        }
        t += max(0.06, 0.05 * t);
    }
    
    // Pass 3: map3 (30 steps)
    for(int i = 0; i < 8; i++) {
        vec3 pos = ro + t * rd;
        if(pos.y < -3.0 || pos.y > 2.0 || sum.a > 0.99) break;
        float den = map3(pos);
        if(den > 0.01) {
            float dif = clamp((den - map3(pos + 0.3 * sundir)) / 0.6, 0.0, 1.0);
            vec3 lin = vec3(1.0, 0.6, 0.3) * dif + vec3(0.91, 0.98, 1.05);
            vec4 col = vec4(mix(vec3(1.0, 0.95, 0.8), vec3(0.25, 0.3, 0.35), den), den);
            col.xyz *= lin;
            col.xyz = mix(col.xyz, bgcol, 1.0 - exp(-0.003 * t * t));
            col.w *= 0.4;
            col.rgb *= col.a;
            sum += col * (1.0 - sum.a);
        }
        t += max(0.06, 0.05 * t);
    }
    
    // Pass 4: map2 (30 steps)
    for(int i = 0; i < 20; i++) {
        vec3 pos = ro + t * rd;
        if(pos.y < -3.0 || pos.y > 2.0 || sum.a > 0.99) break;
        float den = map2(pos);
        if(den > 0.01) {
            float dif = clamp((den - map2(pos + 0.3 * sundir)) / 0.6, 0.0, 1.0);
            vec3 lin = vec3(1.0, 0.6, 0.3) * dif + vec3(0.91, 0.98, 1.05);
            vec4 col = vec4(mix(vec3(1.0, 0.95, 0.8), vec3(0.25, 0.3, 0.35), den), den);
            col.xyz *= lin;
            col.xyz = mix(col.xyz, bgcol, 1.0 - exp(-0.003 * t * t));
            col.w *= 0.4;
            col.rgb *= col.a;
            sum += col * (1.0 - sum.a);
        }
        t += max(0.06, 0.05 * t);
    }
    
    return clamp(sum, 0.0, 1.0);
}

vec4 render(in vec3 ro, in vec3 rd, in ivec2 px) {
    // background sky
    float sun = clamp(dot(sundir, rd), 0.0, 1.0);
    vec3 col = vec3(0.6, 0.71, 0.75) - rd.y * 0.2 * vec3(1.0, 0.5, 1.0) + 0.15 * 0.5;
    col += 0.2 * vec3(1.0, 0.6, 0.1) * pow(sun, 8.0);
    
    // clouds
    vec4 res = raymarch(ro, rd, col, px);
    col = col * (1.0 - res.w) + res.xyz;
    
    // sun glare
    col += vec3(0.2, 0.08, 0.04) * pow(sun, 3.0);
    
    return vec4(col, 1.0);
}

#endif

void main() {
    vec2 fragCoord = v_uv * iResolution;
    vec2 p = (2.0 * fragCoord - iResolution) / iResolution.y;

    // Use camera controls from uniforms
    vec3 ro = cameraPos;
    vec3 ta = cameraTarget;
    mat3 ca = setCamera(ro, ta, cameraRoll);
    
    // ray
    vec3 rd = ca * normalize(vec3(p.xy, 1.5));
    
    gl_FragColor = render(ro, rd, ivec2(fragCoord - 0.5));
}`;
