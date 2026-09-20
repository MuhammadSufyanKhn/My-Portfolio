import { useEffect, useRef } from "react";

interface VaultGateLoaderProps {
  onComplete?: () => void;
}

export default function VaultGateLoader({ onComplete }: VaultGateLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const NS = "http://www.w3.org/2000/svg";

    function $(id: string): any {
      return document.getElementById(id)!;
    }

    const loader = $("loader");
    const svg = $("lsvg");
    const stage = $("lstage");
    const gate = $("lgate");
    const vig = $("lvig");
    const vgrad = $("lvg");
    const seam = $("lseam");
    const shock = $("lshock");
    const hub = $("lhub");
    const hs1 = $("lhs1");
    const hs2 = $("lhs2");
    const col = $("lcol");
    const grv = $("lgrv");
    const lightsG = $("llights");
    const disc = $("ldisc");
    const arc = $("larc");
    const msk = $("lmsk");
    const pill = $("lpill");
    const pillText = $("lpt");

    if (!loader || !svg || !stage || !gate || !vig || !vgrad || !seam || !shock || !hub || !hs1 || !hs2 || !col || !grv || !lightsG || !disc || !arc || !msk || !pill || !pillText) {
      return;
    }

    const T_START = reduce ? 0 : 200;
    const T_CLOSE = reduce ? 0 : 1100;
    const T_LOAD = reduce ? 900 : 2800;
    const T_HOLD = reduce ? 150 : 400;
    const T_OPEN = reduce ? 400 : 1700;
    const tC = T_START;
    const tI = tC + T_CLOSE;
    const tL0 = tI + (reduce ? 0 : 200);
    const tH = tL0 + T_LOAD + T_HOLD;
    const tE = tH + T_OPEN;
    const TAU = Math.PI * 2;
    const N = 6;
    const LX = -Math.SQRT1_2;
    const LY = -Math.SQRT1_2;
    const PHI_IN = (50 * Math.PI) / 180;
    const PHI_UNLOCK = (2.2 * Math.PI) / 180;
    const PHI_OUT = (50 * Math.PI) / 180;

    let k = 1;
    let rB = 72;
    let C = TAU * 72;
    let Rc = 118;
    let Rb = 1000;
    let D = 900;
    let lastS: any = null;
    let opened = false;
    let rafId: number;

    function ease(t: number) {
      return 0.5 - 0.5 * Math.cos(Math.PI * t);
    }
    function inOut(u: number) {
      return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
    }
    function smooth(a: number, b: number, x: number) {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    }
    function clamp(x: number) {
      return Math.min(1, Math.max(0, x));
    }
    function mk(tag: string, cls: string | 0, parent: Element) {
      const e = document.createElementNS(NS, tag);
      if (cls) e.setAttribute("class", cls);
      parent.appendChild(e);
      return e;
    }

    // Guard against double-mount in strict mode so plates are never created twice
    gate.innerHTML = "";
    lightsG.innerHTML = "";

    const names = ["sh2", "sh1", "rim", "face", "shade", "panel", "edge"] as const;
    const G: Record<string, Element> = {};
    const P: {
      sh2: Element[];
      sh1: Element[];
      rim: Element[];
      face: Element[];
      shade: Element[];
      panel: Element[];
      edge: Element[][];
    } = { sh2: [], sh1: [], rim: [], face: [], shade: [], panel: [], edge: [] };
    const lightBase: Element[] = [];
    const lightLit: Element[] = [];

    for (let i = 0; i < names.length; i++) {
      G[names[i]] = mk("g", 0, gate);
    }

    for (let i = 0; i < N; i++) {
      P.sh2.push(mk("path", "l-sh2", G.sh2));
      P.sh1.push(mk("path", "l-sh1", G.sh1));
      P.rim.push(mk("path", "l-rim", G.rim));
      P.face.push(mk("path", "l-face", G.face));
      P.shade.push(mk("path", 0, G.shade));
      P.panel.push(mk("path", "l-panel", G.panel));
      P.edge.push([
        mk("path", "l-bl", G.edge),
        mk("path", "l-bl", G.edge),
        mk("path", "l-bl", G.edge),
      ]);
      lightBase.push(mk("circle", "l-light", lightsG));
      lightLit.push(mk("circle", "l-lit", lightsG));
      lightLit[i].setAttribute("opacity", "0");
    }

    function measure() {
      if (!loader || !svg || !vig || !vgrad || !hs1 || !hs2 || !col || !grv || !disc || !arc || !msk || !seam) return;
      const W = loader.clientWidth || window.innerWidth;
      const H = loader.clientHeight || window.innerHeight;
      let a: number;
      let x: number;
      let y: number;
      let d = "";
      let n: number;
      const half = Math.hypot(W, H) / 2;

      svg.setAttribute("viewBox", -W / 2 + " " + -H / 2 + " " + W + " " + H);
      k = Math.min(1, Math.max(0.7, Math.min(W, H) / 640));
      rB = 72 * k;
      C = TAU * rB;
      Rc = rB + 46 * k;
      Rb = half * 1.22;
      D = half * 1.12;

      vig.setAttribute("x", String(-W / 2 - 40));
      vig.setAttribute("y", String(-H / 2 - 40));
      vig.setAttribute("width", String(W + 80));
      vig.setAttribute("height", String(H + 80));
      vgrad.setAttribute("r", String(half * 1.05));
      hs1.setAttribute("r", String(Rc + 2));
      hs2.setAttribute("r", String(Rc + 10));
      col.setAttribute("r", String(Rc));
      grv.setAttribute("r", String(rB + 24 * k));
      disc.setAttribute("r", String(rB));
      arc.setAttribute("r", String(rB));
      (arc as any).style.strokeDasharray = C;
      msk.setAttribute("font-size", String(28 * k));

      for (n = 0; n < N; n++) {
        a = -Math.PI / 2 + Math.PI / 6 + (n * Math.PI) / 3;
        x = (rB + 35 * k) * Math.cos(a);
        y = (rB + 35 * k) * Math.sin(a);
        [lightBase[n], lightLit[n]].forEach(function (e) {
          e.setAttribute("cx", x.toFixed(2));
          e.setAttribute("cy", y.toFixed(2));
          e.setAttribute("r", String(Math.max(3, 4 * k)));
        });
        d += "M0 0L" + (Rb * Math.cos(a)).toFixed(1) + " " + (Rb * Math.sin(a)).toFixed(1);
      }
      seam.setAttribute("d", d);
    }

    function verts(n: number, d: number, phi: number) {
      const b = -Math.PI / 2 + (n * Math.PI) / 3;
      const ux = Math.cos(b);
      const uy = Math.sin(b);
      const c = Math.cos(phi);
      const s = Math.sin(phi);
      let q: number;
      let x: number;
      let y: number;
      const out: [number, number][] = [];
      const raw: [number, number][] = [
        [0, 0],
        [Rb * Math.cos(b - Math.PI / 6), Rb * Math.sin(b - Math.PI/ 6)],
        [Rb * Math.cos(b + Math.PI / 6), Rb * Math.sin(b + Math.PI / 6)],
      ];
      for (q = 0; q < 3; q++) {
        x = raw[q][0] + d * ux;
        y = raw[q][1] + d * uy;
        out.push([x * c - y * s, x * s + y * c]);
      }
      return out;
    }

    function poly(p: [number, number][], dx: number, dy: number) {
      return (
        "M" +
        (p[0][0] + dx).toFixed(1) +
        " " +
        (p[0][1] + dy).toFixed(1) +
        "L" +
        (p[1][0] + dx).toFixed(1) +
        " " +
        (p[1][1] + dy).toFixed(1) +
        "L" +
        (p[2][0] + dx).toFixed(1) +
        " " +
        (p[2][1] + dy).toFixed(1) +
        "Z"
      );
    }

    function inset(p: [number, number][], g: [number, number], kk: number) {
      const o: [number, number][] = [];
      let q: number;
      for (q = 0; q < 3; q++) {
        o.push([g[0] + (p[q][0] - g[0]) * kk, g[1] + (p[q][1] - g[1]) * kk]);
      }
      return o;
    }

    function render(s: any) {
      let n: number;
      let j: number;
      let pts: [number, number][];
      let g: [number, number];
      let q1: [number, number][];
      let q2: [number, number][];
      let b: number;
      let l: number;
      let A: [number, number];
      let B: [number, number];
      let mx: number;
      let my: number;
      let ml: number;
      const rin = 0.2887 * Rb;
      const th = s.p * TAU;

      for (n = 0; n < N; n++) {
        pts = verts(n, s.d, s.phi);
        g = [(pts[0][0] + pts[1][0] + pts[2][0]) / 3, (pts[0][1] + pts[1][1] + pts[2][1]) / 3];
        P.sh2[n].setAttribute("d", poly(pts, 20, 30));
        P.sh1[n].setAttribute("d", poly(pts, 9, 13));
        P.rim[n].setAttribute("d", poly(pts, 4, 6));
        P.face[n].setAttribute("d", poly(pts, 0, 0));
        b = -Math.PI / 2 + (n * Math.PI) / 3 + s.phi;
        l = Math.cos(b + (3 * Math.PI) / 4);
        P.shade[n].setAttribute("d", poly(pts, 0, 0));
        P.shade[n].setAttribute("fill", l > 0 ? "#fff" : "#000");
        P.shade[n].setAttribute("fill-opacity", (0.05 * Math.abs(l)).toFixed(3));
        q1 = inset(pts, g, 1 - 2.5 / rin);
        q2 = inset(pts, g, 0.8);
        P.panel[n].setAttribute("d", poly(q2, 0, 0));
        for (j = 0; j < 3; j++) {
          A = q1[j];
          B = q1[(j + 1) % 3];
          mx = (A[0] + B[0]) / 2 - g[0];
          my = (A[1] + B[1]) / 2 - g[1];
          ml = Math.hypot(mx, my) || 1;
          P.edge[n][j].setAttribute("d", "M" + A[0].toFixed(1) + " " + A[1].toFixed(1) + "L" + B[0].toFixed(1) + " " + B[1].toFixed(1));
          P.edge[n][j].setAttribute("class", (mx / ml) * LX + (my / ml) * LY > 0 ? "l-bh" : "l-bl");
        }
        lightLit[n].setAttribute("opacity", s.lit.toFixed(3));
      }
      vig.setAttribute("opacity", s.vig.toFixed(3));
      seam.setAttribute("opacity", s.fl.toFixed(3));
      shock.setAttribute("r", s.sr.toFixed(1));
      shock.setAttribute("opacity", s.so.toFixed(3));
      hub.setAttribute("opacity", s.hub.toFixed(3));
      (arc as any).style.strokeDashoffset = C * (1 - s.p);
      pill.setAttribute("transform", "translate(" + (rB * Math.sin(th)).toFixed(2) + " " + (-rB * Math.cos(th)).toFixed(2) + ")");
      pillText.textContent = Math.round(s.p * 100) + "%";
      stage.setAttribute("transform", "translate(" + s.sx.toFixed(2) + " " + s.sy.toFixed(2) + ")");
    }

    function state(t: number) {
      const s = { d: 0, phi: 0, vig: 1, hub: 1, sx: 0, sy: 0, fl: 0, sr: 0, so: 0, lit: 0, p: 0 };
      let u: number;
      let c: number;
      let a: number;
      let a1: number;
      let a2: number;
      let tau: number;

      if (t < tC) {
        s.d = D;
        s.phi = PHI_IN;
      } else if (t < tI) {
        u = (t - tC) / T_CLOSE;
        c = Math.pow(u, 2.4);
        s.d = D * (1 - c);
        s.phi = PHI_IN * (1 - c);
      } else if (t < tH) {
        a = (t - (tH - 350)) / 350;
        s.phi = a > 0 ? PHI_UNLOCK * ease(Math.min(1, a)) : 0;
      } else {
        u = T_OPEN ? Math.min(1, (t - tH) / T_OPEN) : 1;
        c = inOut(u);
        s.d = D * c;
        s.phi = PHI_UNLOCK - PHI_OUT * c;
        s.hub = reduce ? 1 : 1 - smooth(0.5, 0.9, u);
      }

      s.vig = 1 - smooth(0, 0.4, s.d / D);
      s.p = ease(clamp((t - tL0) / T_LOAD));

      if (!reduce) {
        tau = t - tI;
        if (tau >= 0 && tau < 700) {
          a1 = Math.exp(-tau / 120);
          s.sx += 7 * a1 * Math.sin(tau * 0.055);
          s.sy += 5 * a1 * Math.sin(tau * 0.043 + 1.1);
          s.fl = 0.9 * Math.exp(-tau / 170);
          s.sr = Rc + 8 + 300 * (1 - Math.exp(-tau / 240));
          s.so = 0.5 * Math.exp(-tau / 280);
        }
        tau = t - (tH - 350);
        if (tau >= 0 && tau < 450) {
          a2 = Math.exp(-tau / 110);
          s.sx += 2.4 * a2 * Math.sin(tau * 0.06);
          s.sy += 1.6 * a2 * Math.sin(tau * 0.05 + 0.8);
        }
        s.lit = t < tI ? 0 : t < tH - 350 ? Math.min(1, (t - tI) / 150) : Math.max(0, 1 - (t - (tH - 350)) / 120);
      }
      return s;
    }

    function openStart() {
      if (opened) return;
      opened = true;
      loader.classList.add(reduce ? "done" : "open");
      document.body.classList.remove("loading");
      document.body.classList.add("ready");
      onCompleteRef.current?.();
    }

    function end() {
      loader.classList.add("gone");
    }

    let t0: number | null = null;
    function frame(ts: number) {
      if (t0 === null) t0 = ts;
      const t = ts - t0;
      lastS = state(t);
      render(lastS);
      if (t >= tH) openStart();
      if (t >= tE) {
        end();
        return;
      }
      rafId = requestAnimationFrame(frame);
    }

    measure();
    lastS = state(0);
    render(lastS);

    const onTimer = setTimeout(() => {
      loader.classList.add("on");
    }, 30);

    const resizeHandler = () => {
      measure();
      if (lastS) render(lastS);
    };

    window.addEventListener("resize", resizeHandler);
    rafId = requestAnimationFrame(frame);

    const failsafeTimer = setTimeout(() => {
      openStart();
      end();
    }, 12000);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeHandler);
      clearTimeout(onTimer);
      clearTimeout(failsafeTimer);
    };
  }, []);

  return (
    <div className="loader" id="loader" role="status" aria-label="Loading portfolio" ref={containerRef}>
      <svg className="lsvg" id="lsvg" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="lvg" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="800">
            <stop offset=".35" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".12" />
          </radialGradient>
        </defs>
        <g id="lstage">
          <g className="l-gate" id="lgate"></g>
          <rect className="l-vig" id="lvig" fill="url(#lvg)" />
          <g className="l-flash">
            <path className="l-seam" id="lseam" opacity="0" />
            <circle className="l-shock" id="lshock" cx="0" cy="0" r="0" opacity="0" />
          </g>
          <g id="lhub">
            <circle className="l-hs2" id="lhs2" cx="0" cy="14" r="120" />
            <circle className="l-hs1" id="lhs1" cx="0" cy="7" r="120" />
            <circle className="l-collar" id="lcol" cx="0" cy="0" r="118" />
            <circle className="l-groove" id="lgrv" cx="0" cy="0" r="96" />
            <g id="llights"></g>
            <circle className="l-disc" id="ldisc" cx="0" cy="0" r="72" />
            <circle className="l-arc" id="larc" cx="0" cy="0" r="72" transform="rotate(-90)" />
            <text className="l-msk" id="lmsk" x="0" y="0" dy=".35em" textAnchor="middle" fontSize="28">
              MSK
            </text>
            <g id="lpill">
              <rect className="l-pr" x="-23" y="-11" width="46" height="22" rx="11" />
              <text className="l-pt" id="lpt" x="0" y="0" dy=".35em" textAnchor="middle">
                0%
              </text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
