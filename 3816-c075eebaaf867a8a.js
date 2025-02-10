!function() {
    try {
        var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}
          , t = (new e.Error).stack;
        t && (e._sentryDebugIds = e._sentryDebugIds || {},
        e._sentryDebugIds[t] = "d76d8501-3229-404c-8293-502d662b69fe",
        e._sentryDebugIdIdentifier = "sentry-dbid-d76d8501-3229-404c-8293-502d662b69fe")
    } catch (e) {}
}();
"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[3816], {
    82324: function(e, t, a) {
        a.d(t, {
            l: function() {
                return o
            }
        });
        var n = a(27902)
          , r = a(99391)
          , s = a(30095)
          , i = a(2265);
        let o = e => {
            let {address: t, limit: a, offset: o, showDustCoin: d} = e
              , [c,u] = (0,
            i.useState)([])
              , [m,p] = (0,
            i.useState)(!0)
              , {ipfsPrefix: f} = (0,
            r.y)()
              , h = (0,
            i.useCallback)(async () => {
                t && (u((await fetch("".concat((0,
                s.o)(), "/balances/").concat(t, "?limit=").concat(a, "&offset=").concat(o, "&minBalance=").concat(l(d))).then(e => e.json())).map(e => (e.image_uri = (0,
                n.Py)(e.image_uri, f),
                e))),
                p(!1))
            }
            , [t, a, o, d, f]);
            return (0,
            i.useEffect)( () => {
                t && h()
            }
            , [t, a, o, f, h]),
            {
                balances: c,
                fetchBalances: h,
                isLoading: m
            }
        }
          , l = e => e ? -1 : .001
    },
    82221: function(e, t, a) {
        a.d(t, {
            y: function() {
                return r
            }
        });
        var n = a(42422);
        let r = () => {
            let[e,t] = (0,
            n._)("front-running-protection", !1);
            return {
                frontRunningProtection: e,
                setFrontRunningProtection: t
            }
        }
    },
    40773: function(e, t, a) {
        a.d(t, {
            J: function() {
                return r
            }
        });
        var n = a(42422);
        let r = () => {
            let[e,t] = (0,
            n._)("priority-level", "High");
            return {
                priorityLevel: e,
                setPriorityLevel: e => {
                    t(e || "High")
                }
            }
        }
    },
    80880: function(e, t, a) {
        a.d(t, {
            h: function() {
                return i
            }
        });
        var n = a(7475)
          , r = a(15648)
          , s = a(2265);
        let i = e => {
            let[t,a] = (0,
            s.useState)()
              , {connection: i} = (0,
            n.R)();
            async function o() {
                if (e)
                    try {
                        let t = await i.getBalance(new r.PublicKey(e));
                        a(t)
                    } catch (e) {
                        console.error("Error fetching initial balance:", e)
                    }
            }
            return (0,
            s.useEffect)( () => {
                if (!e)
                    return;
                o();
                let t = i.onAccountChange(new r.PublicKey(e), async e => {
                    a(e.lamports)
                }
                );
                return () => {
                    i.removeAccountChangeListener(t)
                }
            }
            , [e]),
            {
                solBalance: t
            }
        }
    },
    30916: function(e, t, a) {
        a.d(t, {
            J: function() {
                return x
            }
        });
        var n = a(57437)
          , r = a(27902)
          , s = a(99391)
          , i = a(86207)
          , o = a(30095)
          , l = a(73987)
          , d = a(8765)
          , c = a(90639)
          , u = a(98099)
          , m = a(2265)
          , p = a(90279)
          , f = a(42422)
          , h = a(99102)
          , y = a(18018)
          , g = a(76955);
        let x = e => {
            let {fetchUser: t} = e
              , a = (0,
            f.O_)()
              , [x,v] = (0,
            d._)("prompt-shown", !1)
              , [b,w] = (0,
            m.useState)(!1)
              , {user: k, fetchUser: j} = (0,
            i.U)()
              , {publicKey: N} = (0,
            c.O)()
              , {ipfsPrefix: _} = (0,
            s.y)()
              , [C,S] = (0,
            m.useState)()
              , [E,P] = (0,
            m.useState)()
              , [T,A] = (0,
            m.useState)()
              , [W,L] = (0,
            m.useState)(null)
              , [O,D] = (0,
            m.useState)(!1)
              , F = (0,
            m.useRef)(null)
              , [I,R] = (0,
            m.useState)(!1)
              , [z,B] = (0,
            m.useState)(!1)
              , [M,V] = (0,
            m.useState)(!1)
              , [K,q] = (0,
            m.useState)();
            (0,
            m.useEffect)( () => {
                a && !x && (w(!0),
                v(!0))
            }
            , [a, x, v]),
            (0,
            m.useEffect)( () => {
                let e = (0,
                r.Py)(null == k ? void 0 : k.profile_image, _);
                console.log("clean", e),
                I || P((null == k ? void 0 : k.username) || (null == N ? void 0 : N.toBase58().slice(0, 6))),
                O || A(e),
                z || S((null == k ? void 0 : k.bio) || "")
            }
            , [k, N, _, I, O, z]);
            let U = async () => {
                let e;
                if (V(!0),
                q(void 0),
                W) {
                    let t = new FormData;
                    t.append("file", W);
                    let a = await fetch("/api/ipfs-file", {
                        method: "POST",
                        body: t
                    });
                    e = await a.json().then(e => e.fileUri)
                }
                let a = await fetch("".concat((0,
                o.o)(), "/users"), {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        profileImage: e,
                        username: E,
                        bio: C
                    })
                }).then(e => {
                    if (!e.ok)
                        throw Error(e.statusText);
                    return e.json()
                }
                ).catch(e => (q(e.message),
                {}));
                a.error && q(a.error),
                R(!1),
                D(!1),
                L(null),
                B(!1),
                t ? t() : j(),
                V(!1)
            }
            ;
            return a ? (0,
            n.jsxs)(y.Vq, {
                open: b,
                onOpenChange: e => {
                    w(e)
                }
                ,
                "data-sentry-element": "Dialog",
                "data-sentry-component": "EditProfile",
                "data-sentry-source-file": "EditProfile.tsx",
                children: [(0,
                n.jsx)(y.hg, {
                    asChild: !0,
                    "data-sentry-element": "DialogTrigger",
                    "data-sentry-source-file": "EditProfile.tsx",
                    children: (0,
                    n.jsxs)("div", {
                        className: "flex gap-2 items-center border border-slate-500 rounded px-1 cursor-pointer hover:bg-slate-700",
                        children: ["edit profile ", (0,
                        n.jsx)(l.oqE, {
                            "data-sentry-element": "Pencil2Icon",
                            "data-sentry-source-file": "EditProfile.tsx"
                        })]
                    })
                }), (0,
                n.jsx)(y.cZ, {
                    className: "bg-primary text-white",
                    "data-sentry-element": "DialogContent",
                    "data-sentry-source-file": "EditProfile.tsx",
                    children: (0,
                    n.jsxs)("div", {
                        className: "grid gap-2",
                        children: [(0,
                        n.jsx)("div", {
                            className: "font-bold",
                            children: "edit profile"
                        }), (0,
                        n.jsxs)("div", {
                            className: "flex gap-4",
                            children: [(0,
                            n.jsx)("div", {
                                children: "Profile photo"
                            }), (0,
                            n.jsxs)("div", {
                                className: "relative cursor-pointer",
                                onClick: () => {
                                    F.current && F.current.click(),
                                    D(!0)
                                }
                                ,
                                children: [(0,
                                n.jsx)(h.default, {
                                    src: T,
                                    alt: "",
                                    width: 64,
                                    height: 64,
                                    className: "w-16 h-16 rounded-full border border-slate-500 object-contain",
                                    "data-sentry-element": "Uimage",
                                    "data-sentry-source-file": "EditProfile.tsx"
                                }), (0,
                                n.jsx)(l.oqE, {
                                    className: "absolute right-[-6px] bottom-[-6px] h-6 w-6",
                                    "data-sentry-element": "Pencil2Icon",
                                    "data-sentry-source-file": "EditProfile.tsx"
                                }), (0,
                                n.jsx)("input", {
                                    type: "file",
                                    ref: F,
                                    onChange: e => {
                                        let t = e.target.files[0];
                                        t && (A(URL.createObjectURL(t)),
                                        L(t))
                                    }
                                    ,
                                    style: {
                                        display: "none"
                                    },
                                    accept: "image/*"
                                })]
                            })]
                        }), (0,
                        n.jsxs)("div", {
                            className: "flex gap-4 mt-4",
                            children: [(0,
                            n.jsx)("div", {
                                children: "Username"
                            }), (0,
                            n.jsx)(g.I, {
                                className: "bg-transparent text-white outline-none w-full pl-3",
                                value: E,
                                maxLength: 10,
                                onChange: e => {
                                    P(e.target.value),
                                    R(!0)
                                }
                                ,
                                "data-sentry-element": "Input",
                                "data-sentry-source-file": "EditProfile.tsx"
                            })]
                        }), (0,
                        n.jsxs)("div", {
                            className: "flex gap-4 mt-4",
                            children: [(0,
                            n.jsx)("div", {
                                children: "Bio"
                            }), (0,
                            n.jsx)(g.I, {
                                className: "bg-transparent text-white outline-none w-full pl-3",
                                value: C,
                                maxLength: 250,
                                onChange: e => {
                                    S(e.target.value),
                                    B(!0)
                                }
                                ,
                                "data-sentry-element": "Input",
                                "data-sentry-source-file": "EditProfile.tsx"
                            })]
                        }), !(null == k ? void 0 : k.username) && (0,
                        n.jsx)("div", {
                            className: "text-xs text-orange-400 justify-self-end",
                            children: "you can change your username once every day"
                        }), K && (0,
                        n.jsx)("div", {
                            className: "text-xs text-red-400 justify-self-end",
                            children: K
                        }), (0,
                        n.jsxs)("div", {
                            className: "flex gap-2 w-fit justify-self-end",
                            children: [(0,
                            n.jsx)("div", {
                                className: "text-slate-50 hover:font-bold hover:text-slate-50 cursor-pointer w-fit justify-self-center",
                                onClick: () => w(!1),
                                children: "[close]"
                            }), (0,
                            n.jsx)("button", {
                                onClick: () => U(),
                                disabled: M || !I && !O && !z,
                                className: (0,
                                u.Z)("py-1 px-4 rounded cursor-pointer", I || O || z ? "bg-green-600 text-white" : "bg-slate-400 text-black"),
                                children: M ? (0,
                                n.jsx)(p.iT, {
                                    color: "white",
                                    height: 24,
                                    width: 24
                                }) : "save"
                            })]
                        })]
                    })
                })]
            }) : null
        }
    },
    84667: function(e, t, a) {
        a.d(t, {
            w: function() {
                return q
            }
        });
        var n = a(57437)
          , r = a(18018)
          , s = a(82221)
          , i = a(80880)
          , o = a(27902)
          , l = a(99391)
          , d = a(60649)
          , c = a(86207)
          , u = a(62627)
          , m = a(36963)
          , p = a(9685)
          , f = a(86390)
          , h = a(73987)
          , y = a(90639)
          , g = a(7475)
          , x = a(63726)
          , v = a(2265)
          , b = a(90279)
          , w = a(42422)
          , k = a(30916)
          , j = e => {
            var t;
            let {onComplete: a} = e
              , [r,s] = (0,
            v.useState)(!1)
              , [i,o] = (0,
            v.useState)(0)
              , l = (0,
            v.useRef)(null)
              , d = (0,
            v.useRef)(null)
              , c = (0,
            v.useRef)(0);
            (0,
            v.useLayoutEffect)( () => {
                if (l.current && d.current) {
                    let e = l.current.offsetWidth
                      , t = d.current.offsetWidth;
                    c.current = e - t
                }
            }
            , []);
            let u = e => {
                s(!0),
                e.preventDefault()
            }
              , m = (0,
            v.useCallback)( () => {
                r && (s(!1),
                i >= c.current ? a() : o(0))
            }
            , [r, i, a])
              , p = (0,
            v.useCallback)(e => {
                if (r && l.current && d.current) {
                    let t = 0;
                    t = "touches"in e ? e.touches[0].clientX : e.clientX;
                    let a = l.current.getBoundingClientRect()
                      , n = d.current.offsetWidth
                      , r = t - a.left - n / 2;
                    r < 0 && (r = 0),
                    r > c.current && (r = c.current),
                    o(r)
                }
            }
            , [r]);
            (0,
            v.useEffect)( () => (r ? (document.addEventListener("mousemove", p),
            document.addEventListener("touchmove", p),
            document.addEventListener("mouseup", m),
            document.addEventListener("touchend", m)) : (document.removeEventListener("mousemove", p),
            document.removeEventListener("touchmove", p),
            document.removeEventListener("mouseup", m),
            document.removeEventListener("touchend", m)),
            () => {
                document.removeEventListener("mousemove", p),
                document.removeEventListener("touchmove", p),
                document.removeEventListener("mouseup", m),
                document.removeEventListener("touchend", m)
            }
            ), [r, p, m]);
            let f = c.current > 0 ? i / c.current * 100 : 0;
            return (0,
            n.jsxs)("div", {
                ref: l,
                className: "relative w-full max-w-md h-12 bg-gray-300 rounded-full overflow-hidden select-none",
                "data-sentry-component": "SlideToUnlock",
                "data-sentry-source-file": "SlideToUnlock.tsx",
                children: [(0,
                n.jsx)("div", {
                    className: "absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-green-500 rounded-e-full",
                    style: {
                        width: "".concat(i + ((null === (t = d.current) || void 0 === t ? void 0 : t.offsetWidth) || 0), "px")
                    }
                }), (0,
                n.jsx)("div", {
                    className: "absolute inset-0 flex items-center justify-center",
                    children: (0,
                    n.jsx)("span", {
                        className: "text-white font-medium",
                        style: {
                            opacity: 1 - f / 100
                        },
                        children: "Slide to unlock"
                    })
                }), (0,
                n.jsx)("div", {
                    ref: d,
                    className: "absolute left-0 top-0 bottom-0 w-12 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg transform active:scale-95 ".concat(r ? "" : "transition-transform duration-300"),
                    style: {
                        transform: "translateX(".concat(i, "px)")
                    },
                    onMouseDown: u,
                    onTouchStart: u,
                    children: (0,
                    n.jsx)("svg", {
                        className: "w-6 h-6 text-blue-500",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        "data-sentry-element": "svg",
                        "data-sentry-source-file": "SlideToUnlock.tsx",
                        children: (0,
                        n.jsx)("path", {
                            fillRule: "evenodd",
                            d: "M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z",
                            clipRule: "evenodd",
                            "data-sentry-element": "path",
                            "data-sentry-source-file": "SlideToUnlock.tsx"
                        })
                    })
                })]
            })
        }
          , N = a(99102)
          , _ = a(73185)
          , C = a(15648)
          , S = a(65993)
          , E = a(67680)
          , P = a(82324)
          , T = a(76955)
          , A = a(95071)
          , W = a(15023)
          , L = a(90964)
          , O = a(15458)
          , D = a(38361)
          , F = a(25714)
          , I = a(86706)
          , R = a(17280)
          , z = a(40773)
          , B = a(7805);
        let M = "/solana-logo-square.png"
          , V = E.YT * E.w6 * 1e-6 + 5e3
          , K = e => {
            let {isOpen: t, address: a, solanaWallets: r, connection: s, useJito: o, frontRunningProtection: l} = e
              , [d,c] = (0,
            v.useState)("")
              , [u,p] = (0,
            v.useState)("")
              , [f,y] = (0,
            v.useState)()
              , [g,x] = (0,
            v.useState)()
              , [b,w] = (0,
            v.useState)()
              , [k,j] = (0,
            v.useState)("")
              , [K,q] = (0,
            v.useState)("")
              , {executeV3: U} = (0,
            m.xX)()
              , {priorityLevel: J} = (0,
            z.J)()
              , {balances: Z, fetchBalances: Y} = (0,
            P.l)({
                address: a,
                limit: 50,
                offset: 0,
                showDustCoin: !1
            })
              , {solBalance: G} = (0,
            i.h)(a);
            (0,
            v.useEffect)( () => {
                t && (Y(),
                q(M),
                j("SOL"))
            }
            , [t]),
            (0,
            v.useEffect)( () => {
                if (!b)
                    return;
                let e = s.onAccountChange(new C.PublicKey(b), async e => {
                    let t = A.p0.decode(e.data);
                    f ? (f.balance = new I.BN(t.amount.toString()).toNumber(),
                    y(f)) : console.log("failed to update withdrawal token balance, no set withdraw balance found"),
                    Z.map(e => {
                        e.mint === (null == f ? void 0 : f.mint) && (e.balance = f.balance)
                    }
                    )
                }
                );
                return () => {
                    s.removeAccountChangeListener(e)
                }
            }
            , [Z, s, b, f]);
            let X = async () => {
                let e = r.find(e => "privy" === e.walletClientType);
                if (!e)
                    return console.log("Failed to estimate: sender wallet not connected"),
                    V;
                let t = new C.PublicKey(e.address)
                  , a = C.Keypair.generate().publicKey
                  , n = [C.SystemProgram.transfer({
                    fromPubkey: t,
                    toPubkey: a,
                    lamports: 890881
                })]
                  , i = await (0,
                E.kn)(t, n)
                  , o = await (0,
                E.Nm)(s, i);
                return E.YT * o * 1e-6 + 5e3
            }
              , H = async () => {
                if (f || G) {
                    if (!f && G) {
                        let e = G - await X() - 890880;
                        e <= 0 && (e = 0),
                        p((0,
                        R.s)(new I.BN(e)).toString())
                    }
                    f && p((f.balance / 1e6).toString())
                }
            }
              , Q = async e => {
                e ? (q(e.image_uri),
                j(e.symbol),
                x(new C.PublicKey(e.mint)),
                y(e)) : (q(M),
                j("SOL"),
                x(null),
                y(null)),
                p("")
            }
              , $ = async () => {
                f ? await ee() : await et()
            }
              , ee = async () => {
                let e = r.find(e => "privy" === e.walletClientType);
                try {
                    let t;
                    if (!e) {
                        B.A.error("wallet not found", {
                            description: "please connect your wallet"
                        });
                        return
                    }
                    let a = 1e6 * parseFloat(u);
                    if (isNaN(a) || a <= 0) {
                        B.A.error("invalid amount", {
                            description: "please enter a valid amount"
                        });
                        return
                    }
                    try {
                        t = new C.PublicKey(d)
                    } catch (e) {
                        B.A.error("invalid address", {
                            description: "please enter a valid wallet address"
                        });
                        return
                    }
                    let n = new C.PublicKey(e.address);
                    if (!g) {
                        B.A.error("invalid mint", {
                            description: "invalid mint"
                        });
                        return
                    }
                    let r = (0,
                    W.MO)(g, n, !0);
                    w(r);
                    let i = await (0,
                    A.D0)(s, r).catch(e => console.log(null == e ? void 0 : e.message))
                      , l = (0,
                    W.MO)(g, t, !0)
                      , m = await (0,
                    A.D0)(s, l).catch(e => console.log(null == e ? void 0 : e.message))
                      , f = [];
                    i || f.push((0,
                    L.ji)(n, r, n, g)),
                    m || f.push((0,
                    L.ji)(n, l, t, g));
                    let h = (0,
                    O.$B)(r, l, n, a);
                    f.push(h);
                    let {lastValidBlockHeight: y, signedTx: x} = await (0,
                    E.a_)(s, n, e, f, E.YT, E.RZ, J);
                    if (!U) {
                        console.error("executeV3 not yet available");
                        return
                    }
                    let v = await U("send_transaction")
                      , b = await (0,
                    S.T)(x, o, !1, v, y);
                    B.A.success("sent ".concat(u, " ").concat(k), {
                        description: "transaction confirmed.",
                        action: {
                            label: "[view tx]",
                            onClick: () => window.open("https://solscan.io/tx/".concat(b), "_blank")
                        }
                    }),
                    c(""),
                    p("")
                } catch (e) {
                    console.error("Could not withdraw token from Privy wallet", e),
                    B.A.error("could not send ${withdrawSymbol}", {
                        description: (null == e ? void 0 : e.message) || "unknown error"
                    })
                }
            }
              , et = async () => {
                let e = r.find(e => "privy" === e.walletClientType);
                try {
                    let t;
                    if (!e) {
                        B.A.error("wallet not found", {
                            description: "please connect your wallet"
                        });
                        return
                    }
                    let a = 1e9 * parseFloat(u);
                    if (isNaN(a) || a <= 0) {
                        B.A.error("invalid amount", {
                            description: "please enter a valid amount"
                        });
                        return
                    }
                    try {
                        t = new C.PublicKey(d)
                    } catch (e) {
                        B.A.error("invalid address", {
                            description: "please enter a valid wallet address"
                        });
                        return
                    }
                    let n = new C.PublicKey(e.address)
                      , r = [C.SystemProgram.transfer({
                        fromPubkey: n,
                        toPubkey: t,
                        lamports: a
                    })]
                      , {lastValidBlockHeight: i, signedTx: l} = await (0,
                    E.a_)(s, n, e, r, E.YT, E.RZ, J);
                    if (!U) {
                        console.error("executeV3 not yet available");
                        return
                    }
                    let m = await U("send_transaction")
                      , f = await (0,
                    S.T)(l, o, !1, m, i);
                    B.A.success("sent ".concat(u, " SOL"), {
                        description: "transaction confirmed.",
                        action: {
                            label: "[view tx]",
                            onClick: () => window.open("https://solscan.io/tx/".concat(f), "_blank")
                        }
                    }),
                    c(""),
                    p(""),
                    x(null),
                    y(null)
                } catch (e) {
                    console.error("Could not withdraw from Privy wallet", e),
                    B.A.error("could not submit withdraw", {
                        description: (null == e ? void 0 : e.message) || "Unknown error"
                    })
                }
            }
            ;
            return (0,
            n.jsxs)("div", {
                className: "grid gap-4 text-white",
                "data-sentry-component": "WithdrawForm",
                "data-sentry-source-file": "WithdrawForm.tsx",
                children: [(0,
                n.jsx)("div", {
                    className: "grid gap-4 text-white",
                    children: "Withdraw from Pump (Wallet)"
                }), (0,
                n.jsx)(T.I, {
                    className: "bg-[#2a2a3b] border border-slate-200 rounded-md p-2",
                    placeholder: "Wallet Address",
                    type: "text",
                    value: d,
                    onChange: e => c(e.target.value),
                    "data-sentry-element": "Input",
                    "data-sentry-source-file": "WithdrawForm.tsx"
                }), (0,
                n.jsxs)("div", {
                    className: "flex items-center rounded-md relative bg-[#2e303a]",
                    children: [(0,
                    n.jsx)(T.I, {
                        className: "bg-[#2a2a3b] border border-slate-200 rounded-md p-2",
                        placeholder: "Amount",
                        type: "text",
                        value: u,
                        onChange: e => {
                            let t = e.target.value;
                            /^\d*\.?\d*$/.test(t) && p(e.target.value)
                        }
                        ,
                        "data-sentry-element": "Input",
                        "data-sentry-source-file": "WithdrawForm.tsx"
                    }), (0,
                    n.jsxs)("div", {
                        className: "flex items-center ml-2 absolute right-2",
                        children: [(0,
                        n.jsxs)(D.h_, {
                            "data-sentry-element": "DropdownMenu",
                            "data-sentry-source-file": "WithdrawForm.tsx",
                            children: [(0,
                            n.jsxs)(D.xz, {
                                className: "flex items-center rounded-md relative ",
                                "data-sentry-element": "Trigger",
                                "data-sentry-source-file": "WithdrawForm.tsx",
                                children: [(0,
                                n.jsx)("span", {
                                    className: "text-white mr-2",
                                    children: k
                                }), (0,
                                n.jsx)(N.default, {
                                    className: "w-8 h-8 rounded-full",
                                    width: 32,
                                    height: 32,
                                    src: K,
                                    alt: k,
                                    "data-sentry-element": "Uimage",
                                    "data-sentry-source-file": "WithdrawForm.tsx"
                                }), (0,
                                n.jsx)(h.VAA, {
                                    "data-sentry-element": "CaretDownIcon",
                                    "data-sentry-source-file": "WithdrawForm.tsx"
                                })]
                            }), (0,
                            n.jsxs)(D.AW, {
                                className: "z-10 text-sm bg-primary p-3 text-[#bcbcbc] rounded space-y-4",
                                "data-sentry-element": "DropdownMenuContent",
                                "data-sentry-source-file": "WithdrawForm.tsx",
                                children: [(0,
                                n.jsxs)(D.Xi, {
                                    onClick: () => Q(),
                                    className: "flex items-center rounded-md relative hover:bg-gray-800 cursor-pointer",
                                    "data-sentry-element": "DropdownMenuItem",
                                    "data-sentry-source-file": "WithdrawForm.tsx",
                                    children: [(0,
                                    n.jsx)(N.default, {
                                        className: "w-8 h-8 mr-2 rounded-full",
                                        width: 32,
                                        height: 32,
                                        src: M,
                                        alt: "SOL",
                                        "data-sentry-element": "Uimage",
                                        "data-sentry-source-file": "WithdrawForm.tsx"
                                    }), (0,
                                    n.jsxs)("span", {
                                        className: "text-white mr-2",
                                        children: [" ", !!G && G && (0,
                                        n.jsxs)(n.Fragment, {
                                            children: [(G / 1e9).toFixed(2), " ", "SOL"]
                                        }), " "]
                                    })]
                                }, "SOL"), Z.map(e => (0,
                                n.jsxs)(D.Xi, {
                                    onClick: () => Q(e),
                                    className: "flex items-center rounded-md relative hover:bg-gray-800 cursor-pointer",
                                    children: [(0,
                                    n.jsx)(N.default, {
                                        className: "w-8 h-8 mr-2 rounded-full",
                                        width: 32,
                                        height: 32,
                                        src: e.image_uri,
                                        alt: e.name
                                    }), (0,
                                    n.jsxs)("div", {
                                        children: [(0,
                                        n.jsxs)("span", {
                                            className: "text-white mr-2",
                                            children: [Number((0,
                                            F.K)(e.balance)).toFixed(0), " ", e.symbol]
                                        }), (0,
                                        n.jsx)("div", {
                                            children: e.name
                                        })]
                                    })]
                                }, e.symbol))]
                            })]
                        }), (0,
                        n.jsx)("button", {
                            onClick: () => H(),
                            className: "text-xs py-1 px-2 ml-1 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300",
                            children: "Max"
                        })]
                    })]
                }), (0,
                n.jsxs)("span", {
                    className: "flex justify-self-end w-fit text-gray-500",
                    children: [" ", !!G && G && !f && (0,
                    n.jsxs)(n.Fragment, {
                        children: ["Available ", (G / 1e9).toFixed(2), " ", "SOL"]
                    }), " ", f && (0,
                    n.jsxs)(n.Fragment, {
                        children: ["Available", " ", Number((0,
                        F.K)(f.balance)).toFixed(0), " ", k]
                    }), " "]
                }), (0,
                n.jsx)(_.z, {
                    className: "bg-gray-300 text-primary hover:text-slate-50",
                    onClick: $,
                    "data-sentry-element": "Button",
                    "data-sentry-source-file": "WithdrawForm.tsx",
                    children: "Send"
                })]
            })
        }
        ;
        function q() {
            let {select: e, wallets: t} = (0,
            y.O)()
              , [a,f] = (0,
            v.useState)(!1)
              , [j,C] = (0,
            v.useState)(!1)
              , [S,E] = (0,
            v.useState)(!1)
              , {address: P, requiresLogin: T, login: A, privyLogin: W, loginLoading: L, privyLoginFailed: O, user: D, logout: F, shouldUsePrivy: I} = (0,
            c.U)()
              , {ipfsPrefix: R} = (0,
            l.y)()
              , {solBalance: z} = (0,
            i.h)(P)
              , {connection: B} = (0,
            g.R)()
              , {useJito: M} = (0,
            d.c)()
              , {frontRunningProtection: V} = (0,
            s.y)()
              , {wallets: q} = (0,
            p.p)()
              , [Z,Y] = (0,
            v.useState)(!1)
              , [G,X] = (0,
            v.useState)("")
              , [H,Q] = (0,
            w._)("show-wallet", !1)
              , $ = (0,
            o.Py)(null == D ? void 0 : D.profile_image, R)
              , ee = () => {
                window.open("https://wallet.magiceden.io/download", "_blank")
            }
              , et = async () => {
                try {
                    await A()
                } catch (e) {
                    console.error(e),
                    e instanceof u.Wj && e.errorName === u.Pp && (E(!0),
                    Q(!1))
                }
            }
            ;
            return (0,
            v.useEffect)( () => {
                O && (E(!0),
                Q(!1))
            }
            , [O, Q]),
            (0,
            v.useEffect)( () => {
                T && et()
            }
            , [T]),
            (0,
            v.useEffect)( () => {
                !I && T && Q(!0)
            }
            , [I, T, Q]),
            (0,
            n.jsxs)(n.Fragment, {
                children: [(0,
                n.jsx)(U, {
                    isWalletNonCompliantModalOpen: S,
                    setIsWalletNonCompliantModalOpen: E,
                    "data-sentry-element": "WalletNonCompliant",
                    "data-sentry-source-file": "Wallet.tsx"
                }), (0,
                n.jsxs)(r.Vq, {
                    open: H,
                    onOpenChange: Q,
                    "data-sentry-element": "Dialog",
                    "data-sentry-source-file": "Wallet.tsx",
                    children: [(0,
                    n.jsx)(r.hg, {
                        asChild: !0,
                        "data-sentry-element": "DialogTrigger",
                        "data-sentry-source-file": "Wallet.tsx",
                        children: P ? (0,
                        n.jsx)("div", {
                            className: "text-white text-sm grid justify-items-end",
                            children: (0,
                            n.jsxs)("div", {
                                className: "flex items-center gap-1 border border-slate-500 rounded px-1 cursor-pointer hover:bg-slate-600",
                                children: [(0,
                                n.jsxs)("span", {
                                    className: "hidden sm:block",
                                    children: [!!z && z && (0,
                                    n.jsxs)(n.Fragment, {
                                        children: ["(", (z / 1e9).toFixed(2), " SOL)"]
                                    }), " "]
                                }), (0,
                                n.jsx)("div", {
                                    children: (0,
                                    n.jsx)(N.default, {
                                        width: 16,
                                        height: 16,
                                        className: "w-4 h-4 rounded-full object-contain",
                                        src: $,
                                        alt: ""
                                    })
                                }), (0,
                                n.jsx)("div", {
                                    children: (null == D ? void 0 : D.username) || P.slice(0, 6)
                                }), (0,
                                n.jsx)(h.AS7, {})]
                            })
                        }) : (0,
                        n.jsx)("button", {
                            className: "text-sm text-slate-50 hover:bg-transparent hover:underline hover:text-slate-50",
                            onClick: () => I ? et() : () => {}
                            ,
                            children: "[connect wallet]"
                        })
                    }), (0,
                    n.jsx)(r.cZ, {
                        className: "bg-primary text-white text-center",
                        "data-sentry-element": "DialogContent",
                        "data-sentry-source-file": "Wallet.tsx",
                        children: (0,
                        n.jsx)(n.Fragment, {
                            children: ( () => {
                                if (!I && T)
                                    return (0,
                                    n.jsxs)("div", {
                                        className: "grid gap-4 justify-items-center",
                                        children: [(0,
                                        n.jsx)("div", {
                                            children: "sign in to pump"
                                        }), L ? (0,
                                        n.jsxs)("div", {
                                            className: "flex gap-4 py-2 px-4 border border-white rounded-full w-fit",
                                            children: [(0,
                                            n.jsx)("div", {
                                                children: "confirm in your wallet"
                                            }), (0,
                                            n.jsx)(b.iT, {
                                                color: "white",
                                                height: 24,
                                                width: 24
                                            })]
                                        }) : (0,
                                        n.jsx)(_.z, {
                                            className: "bg-gray-300 text-primary hover:text-slate-50",
                                            onClick: () => et(),
                                            children: "sign message"
                                        })]
                                    });
                                if (!I && !P) {
                                    let a;
                                    let r = t.filter(e => "Installed" === e.readyState || "Loadable" === e.readyState)
                                      , s = r.some(e => "Magic Eden" === e.adapter.name)
                                      , i = [...r];
                                    s || i.splice(3, 0, {
                                        adapter: {
                                            name: "Magic Eden",
                                            icon: "/magic_eden.png?height=24&width=24"
                                        }
                                    });
                                    let o = i.find(e => "Phantom" === e.adapter.name);
                                    return a = Z ? i : o ? [o] : i.length > 0 ? [i[0]] : [],
                                    (0,
                                    n.jsxs)("div", {
                                        className: "grid gap-4",
                                        children: [(0,
                                        n.jsxs)("div", {
                                            className: "flex flex-col items-center",
                                            children: [(0,
                                            n.jsx)("h2", {
                                                className: "text-lg",
                                                children: "Log in or sign up"
                                            }), (0,
                                            n.jsxs)("div", {
                                                className: "mt-2 w-full max-w-[400px]",
                                                children: [(0,
                                                n.jsxs)("label", {
                                                    className: "flex items-center border border-gray-300 rounded-md overflow-hidden",
                                                    children: [(0,
                                                    n.jsx)("span", {
                                                        className: "px-2 text-gray-500",
                                                        children: (0,
                                                        n.jsx)("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            strokeWidth: "1.5",
                                                            stroke: "currentColor",
                                                            className: "w-6 h-6",
                                                            children: (0,
                                                            n.jsx)("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                d: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                                            })
                                                        })
                                                    }), (0,
                                                    n.jsx)("input", {
                                                        id: "email-input",
                                                        type: "email",
                                                        value: G,
                                                        onChange: e => X(e.target.value),
                                                        placeholder: "your@email.com",
                                                        autoComplete: "email",
                                                        className: "flex-1 min-w-0 w-full p-2 text-white bg-transparent outline-none [@media(max-width:350px)]:text-xs"
                                                    }), (0,
                                                    n.jsx)("button", {
                                                        onClick: async () => {
                                                            Q(!1),
                                                            W({
                                                                prefill: {
                                                                    type: "email",
                                                                    value: G
                                                                }
                                                            })
                                                        }
                                                        ,
                                                        className: "px-4 py-2 text-green-300 [@media(max-width:350px)]:text-xs",
                                                        children: "submit"
                                                    })]
                                                }), (0,
                                                n.jsx)("div", {
                                                    className: "mt-2 flex justify-end",
                                                    children: (0,
                                                    n.jsx)("a", {
                                                        href: "https://docs.privy.io/guide/react/wallets/overview",
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        children: (0,
                                                        n.jsx)("img", {
                                                            src: "/privy.svg",
                                                            alt: "Protected by Privy",
                                                            className: "filter brightness-0 invert mt-1"
                                                        })
                                                    })
                                                })]
                                            })]
                                        }), (0,
                                        n.jsxs)("div", {
                                            className: "flex items-center my-2",
                                            children: [(0,
                                            n.jsx)("hr", {
                                                className: "flex-grow border-t border-gray-400"
                                            }), (0,
                                            n.jsx)("span", {
                                                className: "mx-2",
                                                children: "OR"
                                            }), (0,
                                            n.jsx)("hr", {
                                                className: "flex-grow border-t border-gray-400"
                                            })]
                                        }), a.length > 0 ? a.map( (t, a) => (0,
                                        n.jsx)("div", {
                                            className: "flex justify-center items-center",
                                            children: (0,
                                            n.jsxs)(_.z, {
                                                onClick: () => "Magic Eden" !== t.adapter.name || s ? e(t.adapter.name) : ee(),
                                                className: "relative w-[180px] bg-[#5c5f66] text-white flex items-center justify-center px-4 py-2 rounded-md",
                                                children: [(0,
                                                n.jsx)(x.default, {
                                                    src: t.adapter.icon,
                                                    alt: t.adapter.name,
                                                    width: 24,
                                                    height: 24,
                                                    className: "absolute left-2"
                                                }), t.adapter.name]
                                            })
                                        }, a)) : (0,
                                        n.jsx)("div", {
                                            className: "flex justify-center items-center",
                                            children: (0,
                                            n.jsx)("p", {
                                                children: "No wallet found. Please download a supported Solana wallet."
                                            })
                                        }), !Z && i.length > 1 && (0,
                                        n.jsx)("div", {
                                            className: "flex justify-center items-center",
                                            children: (0,
                                            n.jsx)(_.z, {
                                                onClick: () => Y(!0),
                                                className: "relative w-[180px] bg-[#5c5f66] text-white flex items-center justify-center px-4 py-2 rounded-md",
                                                children: "more wallets..."
                                            })
                                        })]
                                    })
                                }
                                return (0,
                                n.jsxs)("div", {
                                    className: "grid gap-4 justify-center",
                                    children: [(0,
                                    n.jsxs)("div", {
                                        className: "flex gap-4 items-start",
                                        children: [(0,
                                        n.jsx)("div", {
                                            children: (0,
                                            n.jsx)(N.default, {
                                                width: 64,
                                                height: 64,
                                                className: "w-16 h-16 rounded-full border border-slate-600 object-contain",
                                                src: $,
                                                alt: ""
                                            })
                                        }), (0,
                                        n.jsxs)("div", {
                                            className: "grid justify-items-start gap-1",
                                            children: [(0,
                                            n.jsxs)("div", {
                                                children: ["@", (null == D ? void 0 : D.username) || (P ? P.slice(0, 6) : "")]
                                            }), (0,
                                            n.jsx)("div", {
                                                children: (null == D ? void 0 : D.bio) || ""
                                            }), (0,
                                            n.jsx)(k.J, {})]
                                        })]
                                    }), (0,
                                    n.jsx)("div", {
                                        className: "text-xs sm:text-sm border border-white rounded p-2",
                                        children: P
                                    }), (0,
                                    n.jsx)(_.z, {
                                        className: "bg-gray-300 text-primary hover:text-slate-50",
                                        onClick: async () => {
                                            await F(),
                                            Q(!1)
                                        }
                                        ,
                                        children: "disconnect wallet"
                                    }), P && I && (0,
                                    n.jsx)(_.z, {
                                        className: "bg-gray-300 text-primary hover:text-slate-50",
                                        onClick: () => {
                                            Q(!1),
                                            f(!0)
                                        }
                                        ,
                                        children: "Withdraw From Privy Wallet"
                                    }), P && I && (0,
                                    n.jsx)(_.z, {
                                        className: "bg-gray-300 text-primary hover:text-slate-50",
                                        onClick: () => {
                                            Q(!1),
                                            C(!0)
                                        }
                                        ,
                                        children: "Export Privy Wallet"
                                    }), (0,
                                    n.jsx)("div", {
                                        className: "text-slate-50 hover:font-bold hover:text-slate-50 cursor-pointer w-fit justify-self-center",
                                        onClick: () => Q(!1),
                                        children: "[close]"
                                    })]
                                })
                            }
                            )()
                        })
                    })]
                }), (0,
                n.jsx)(J, {
                    isExportModalOpen: j,
                    setIsExportModalOpen: C,
                    "data-sentry-element": "ExportWallet",
                    "data-sentry-source-file": "Wallet.tsx"
                }), a && (0,
                n.jsx)(r.Vq, {
                    open: a,
                    onOpenChange: f,
                    children: (0,
                    n.jsx)(r.Vq, {
                        open: a,
                        onOpenChange: f,
                        children: (0,
                        n.jsx)(r.cZ, {
                            className: "bg-primary text-black text-center",
                            children: (0,
                            n.jsx)(m.pm, {
                                siteKey: "6LcmKsYpAAAAABAANpgK3LDxDlxfDCoPQUYm3NZI",
                                type: "v3",
                                isEnterprise: !0,
                                explicit: {
                                    badge: "hidden"
                                },
                                children: (0,
                                n.jsx)(K, {
                                    isOpen: a,
                                    address: P,
                                    solanaWallets: q,
                                    connection: B,
                                    useJito: M,
                                    frontRunningProtection: V
                                })
                            })
                        })
                    })
                })]
            })
        }
        let U = e => {
            let {isWalletNonCompliantModalOpen: t, setIsWalletNonCompliantModalOpen: a} = e;
            return (0,
            n.jsx)(r.Vq, {
                open: t,
                onOpenChange: a,
                "data-sentry-element": "Dialog",
                "data-sentry-component": "WalletNonCompliant",
                "data-sentry-source-file": "Wallet.tsx",
                children: (0,
                n.jsxs)(r.cZ, {
                    className: "bg-primary text-white text-center",
                    "aria-describedby": void 0,
                    "data-sentry-element": "DialogContent",
                    "data-sentry-source-file": "Wallet.tsx",
                    children: [(0,
                    n.jsx)(r.$N, {
                        "data-sentry-element": "DialogTitle",
                        "data-sentry-source-file": "Wallet.tsx",
                        children: "Wallet connection unsuccessful"
                    }), (0,
                    n.jsxs)("p", {
                        className: "bg-yellow-500 p-2 text-black rounded text-sm",
                        children: ["We were unable to connect your wallet to our platform as it does not meet the requirements of our compliance policy. Ensuring compliance with regulatory and security standards is crucial to maintaining a safe and trustworthy environment for all our users. If you believe this may be an error or would like further clarification, please do not hesitate to contact our", (0,
                        n.jsxs)("a", {
                            className: "text-sm text-white hover:underline hover:font-bold",
                            href: "https://t.me/launchonpump",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: [" ", "support team."]
                        })]
                    })]
                })
            })
        }
          , J = e => {
            let {isExportModalOpen: t, setIsExportModalOpen: a} = e
              , {ready: s, authenticated: i, user: o} = (0,
            f.s)()
              , {exportWallet: l} = (0,
            p.p)()
              , d = !!(null == o ? void 0 : o.linkedAccounts.find(e => "wallet" === e.type && "privy" === e.walletClientType && "solana" === e.chainType))
              , c = async () => {
                a(!0),
                await l()
            }
            ;
            return (0,
            n.jsx)(r.Vq, {
                open: t,
                onOpenChange: a,
                "data-sentry-element": "Dialog",
                "data-sentry-component": "ExportWallet",
                "data-sentry-source-file": "Wallet.tsx",
                children: (0,
                n.jsx)(r.cZ, {
                    className: "bg-primary text-white text-center",
                    "aria-describedby": void 0,
                    "data-sentry-element": "DialogContent",
                    "data-sentry-source-file": "Wallet.tsx",
                    children: (0,
                    n.jsxs)(m.pm, {
                        siteKey: "6LcmKsYpAAAAABAANpgK3LDxDlxfDCoPQUYm3NZI",
                        type: "v3",
                        isEnterprise: !0,
                        explicit: {
                            badge: "hidden"
                        },
                        "data-sentry-element": "GoogleReCaptchaProvider",
                        "data-sentry-source-file": "Wallet.tsx",
                        children: [(0,
                        n.jsx)(r.$N, {
                            "data-sentry-element": "DialogTitle",
                            "data-sentry-source-file": "Wallet.tsx",
                            children: "Export Wallet"
                        }), (0,
                        n.jsx)("p", {
                            className: "bg-yellow-500 p-2 text-black rounded text-sm",
                            children: "pump will never ask you your private keys or seed phrase."
                        }), (0,
                        n.jsx)("p", {
                            children: "to unlock your private key please drag until the end"
                        }), s && i && d && (0,
                        n.jsx)(j, {
                            onComplete: c
                        })]
                    })
                })
            })
        }
    },
    73185: function(e, t, a) {
        a.d(t, {
            z: function() {
                return d
            }
        });
        var n = a(57437)
          , r = a(2265)
          , s = a(98230)
          , i = a(10827)
          , o = a(27902);
        let l = (0,
        i.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300", {
            variants: {
                variant: {
                    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
                    destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
                    outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
                    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
                    ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
                    link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50"
                },
                size: {
                    default: "h-10 px-4 py-2",
                    sm: "h-9 rounded-md px-3",
                    lg: "h-11 rounded-md px-8",
                    icon: "h-10 w-10"
                }
            },
            defaultVariants: {
                variant: "default",
                size: "default"
            }
        })
          , d = r.forwardRef( (e, t) => {
            let {className: a, variant: r, size: i, asChild: d=!1, ...c} = e
              , u = d ? s.g7 : "button";
            return (0,
            n.jsx)(u, {
                className: (0,
                o.cn)(l({
                    variant: r,
                    size: i,
                    className: a
                })),
                ref: t,
                ...c
            })
        }
        );
        d.displayName = "Button"
    },
    18018: function(e, t, a) {
        a.d(t, {
            $N: function() {
                return f
            },
            Vq: function() {
                return l
            },
            cZ: function() {
                return m
            },
            fK: function() {
                return p
            },
            hg: function() {
                return d
            }
        });
        var n = a(57437)
          , r = a(2265)
          , s = a(28631)
          , i = a(82489)
          , o = a(27902);
        let l = s.fC
          , d = s.xz
          , c = s.h_;
        s.x8;
        let u = r.forwardRef( (e, t) => {
            let {className: a, ...r} = e;
            return (0,
            n.jsx)(s.aV, {
                ref: t,
                className: (0,
                o.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", a),
                ...r
            })
        }
        );
        u.displayName = s.aV.displayName;
        let m = r.forwardRef( (e, t) => {
            let {className: a, children: r, showClose: l, ...d} = e;
            return (0,
            n.jsxs)(c, {
                children: [(0,
                n.jsx)(u, {}), (0,
                n.jsxs)(s.VY, {
                    ref: t,
                    className: (0,
                    o.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-slate-800 dark:bg-slate-950", a),
                    ...d,
                    children: [r, l && (0,
                    n.jsxs)(s.x8, {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400",
                        children: [(0,
                        n.jsx)(i.Z, {
                            className: "h-4 w-4"
                        }), (0,
                        n.jsx)("span", {
                            className: "sr-only",
                            children: "Close"
                        })]
                    })]
                })]
            })
        }
        );
        m.displayName = s.VY.displayName;
        let p = e => {
            let {className: t, ...a} = e;
            return (0,
            n.jsx)("div", {
                className: (0,
                o.cn)("flex flex-col space-y-1.5 text-center sm:text-left", t),
                ...a,
                "data-sentry-component": "DialogHeader",
                "data-sentry-source-file": "dialog.tsx"
            })
        }
        ;
        p.displayName = "DialogHeader";
        let f = r.forwardRef( (e, t) => {
            let {className: a, ...r} = e;
            return (0,
            n.jsx)(s.Dx, {
                ref: t,
                className: (0,
                o.cn)("text-lg font-semibold leading-none tracking-tight", a),
                ...r
            })
        }
        );
        f.displayName = s.Dx.displayName,
        r.forwardRef( (e, t) => {
            let {className: a, ...r} = e;
            return (0,
            n.jsx)(s.dk, {
                ref: t,
                className: (0,
                o.cn)("text-sm text-slate-500 dark:text-slate-400", a),
                ...r
            })
        }
        ).displayName = s.dk.displayName
    },
    76955: function(e, t, a) {
        a.d(t, {
            I: function() {
                return i
            }
        });
        var n = a(57437)
          , r = a(2265)
          , s = a(27902);
        let i = r.forwardRef( (e, t) => {
            let {className: a, type: r, ...i} = e;
            return (0,
            n.jsx)("input", {
                type: r,
                className: (0,
                s.cn)("flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300", a),
                ref: t,
                ...i
            })
        }
        );
        i.displayName = "Input"
    },
    60649: function(e, t, a) {
        a.d(t, {
            JitoProvider: function() {
                return l
            },
            c: function() {
                return o
            }
        });
        var n = a(57437)
          , r = a(30095)
          , s = a(2265);
        let i = (0,
        s.createContext)({
            useJito: !1
        })
          , o = () => (0,
        s.useContext)(i)
          , l = e => {
            let {children: t} = e
              , [a,o] = (0,
            s.useState)(!1)
              , [l,d] = (0,
            s.useState)()
              , c = async () => {
                let {jitoTipAccount: e} = await fetch("".concat((0,
                r.o)(), "/send-transaction/jito-tip-account")).then(e => e.json());
                d(e)
            }
            ;
            return (0,
            s.useEffect)( () => {
                c(),
                .01 > Math.random() && o(!0)
            }
            , []),
            (0,
            n.jsx)(i.Provider, {
                value: {
                    tipAccount: l,
                    useJito: a
                },
                "data-sentry-element": "unknown",
                "data-sentry-component": "JitoProvider",
                "data-sentry-source-file": "JitoProvider.tsx",
                children: t
            })
        }
    },
    67680: function(e, t, a) {
        a.d(t, {
            Fe: function() {
                return d
            },
            Nm: function() {
                return b
            },
            RZ: function() {
                return h
            },
            S0: function() {
                return o
            },
            WX: function() {
                return c
            },
            YT: function() {
                return m
            },
            Ys: function() {
                return p
            },
            a_: function() {
                return k
            },
            kn: function() {
                return g
            },
            od: function() {
                return j
            },
            r4: function() {
                return u
            },
            sM: function() {
                return f
            },
            vx: function() {
                return N
            },
            w6: function() {
                return l
            }
        });
        var n = a(44066)
          , r = a(15648)
          , s = a(86706)
          , i = a(68166);
        let o = "confirmed"
          , l = 1e5
          , d = 1e8
          , c = 26e4
          , u = 1e5
          , m = 5e3
          , p = 1
          , f = 1.05
          , h = 1;
        function y(e, t, a) {
            return new r.VersionedTransaction(new r.TransactionMessage({
                payerKey: e,
                instructions: t,
                recentBlockhash: a
            }).compileToV0Message())
        }
        async function g(e, t) {
            if (t.some(e => e.programId.equals(r.ComputeBudgetProgram.programId)))
                throw Error("ComputeBudgetInstructions present in simulatedInstructions");
            let a = [r.ComputeBudgetProgram.setComputeUnitLimit({
                units: 14e5
            }), r.ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: 1
            })];
            return a.push(...t),
            y(e, a, "11111111111111111111111111111111")
        }
        let x = (0,
        s.Ny)(i);
        async function v(e, t, a) {
            var n;
            let r = await e.simulateTransaction(t, {
                sigVerify: !1,
                replaceRecentBlockhash: !0
            })
              , i = r.value;
            if (i.err)
                throw console.error("failed to simulate transaction", r),
                function(e) {
                    var t;
                    if ("AccountNotFound" === e.err)
                        return Error("Your account has 0 SOL. Please transfer some SOL to your account.");
                    if ((null === (t = e.err) || void 0 === t ? void 0 : t.InstructionError) === void 0)
                        return Error(JSON.stringify(e.err));
                    let a = e.logs;
                    if (!a)
                        throw Error("Missing tx simulation logs on failure");
                    let n = (0,
                    s.R4)(e, x);
                    return n instanceof s.DG || n instanceof s.cM ? n : function(e) {
                        let t = /Program (\w+) failed: (.+)/
                          , a = /custom program error: (0x[0-9a-fA-F]+)/;
                        for (let n of e) {
                            let r = n.match(t);
                            if (r)
                                switch (r[1]) {
                                case "11111111111111111111111111111111":
                                    switch (parseInt(r[2].match(a)[1])) {
                                    case 0:
                                        return Error("Account already exists: ".concat(e[e.indexOf(n) - 1]));
                                    case 1:
                                        return Error("Insufficient funds: ".concat(e[e.indexOf(n) - 1]))
                                    }
                                    break;
                                case "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8":
                                    switch (parseInt(r[2].match(a)[1])) {
                                    case 30:
                                        return Error("Raydium exceeded slippage: ".concat(e[e.indexOf(n) - 2]));
                                    case 40:
                                        return Error("Raydium insufficient funds: ".concat(e[e.indexOf(n) - 2]))
                                    }
                                    break;
                                case "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL":
                                    if ("Provided owner is not allowed" === r[2])
                                        return Error("Illegal owner: ".concat(n))
                                }
                        }
                        return null
                    }(a) || (a.length >= 4 ? Error([a[a.length - 4], a[a.length - 3]].join(" ")) : Error(a.join(" ")))
                }(i);
            return null !== (n = i.unitsConsumed) && void 0 !== n ? n : a
        }
        async function b(e, t) {
            let a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "High";
            try {
                var r;
                let s = await fetch(e.rpcEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        jsonrpc: "2.0",
                        id: "1",
                        method: "getPriorityFeeEstimate",
                        params: [{
                            transaction: n.bs58.encode(t.serialize()),
                            options: {
                                priorityLevel: a
                            }
                        }]
                    })
                }).then(e => e.json());
                if (s.error)
                    throw Error(s.error.message);
                let i = Math.floor(Math.min(Math.max((null == s ? void 0 : null === (r = s.result) || void 0 === r ? void 0 : r.priorityFeeEstimate) || 0, l), d));
                return console.log("priority fee estimate", i),
                i
            } catch (e) {
                console.error("failed to fetch priority fee", e)
            }
            return l
        }
        async function w(e, t, a, n, s, i) {
            let o = await g(t, a)
              , [l,d] = await Promise.all([v(e, o, n), b(e, o, i)]);
            return [r.ComputeBudgetProgram.setComputeUnitLimit({
                units: l * s
            }), r.ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: d
            }), ...a]
        }
        async function k(e, t, a, n, r, s, i) {
            let o = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : async e => e
              , l = await w(e, t, n, r, s, i)
              , {blockhash: d, lastValidBlockHeight: c} = await e.getLatestBlockhash()
              , u = y(t, l, d)
              , m = await o(u);
            return {
                lastValidBlockHeight: c,
                signedTx: await a.signTransaction(m)
            }
        }
        function j(e) {
            return n.bs58.encode(e.serialize())
        }
        function N(e) {
            return r.VersionedTransaction.deserialize(n.bs58.decode(e))
        }
    },
    25714: function(e, t, a) {
        a.d(t, {
            K: function() {
                return r
            }
        });
        var n = a(86706);
        let r = e => "number" == typeof e ? e / 1e6 : e.div(new n.BN(1e6)).toNumber()
    },
    17280: function(e, t, a) {
        a.d(t, {
            s: function() {
                return r
            }
        });
        var n = a(15648);
        let r = e => e.toNumber() / n.LAMPORTS_PER_SOL
    },
    65993: function(e, t, a) {
        a.d(t, {
            T: function() {
                return s
            }
        });
        var n = a(44066)
          , r = a(30095);
        let s = async (e, t, a, s, i, o) => (fetch("".concat((0,
        r.o)(), "/send-transaction"), {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                serializedTransaction: n.bs58.encode(e.serialize()),
                retries: 5,
                frontRunningProtection: a,
                useJito: t,
                captchaToken: encodeURIComponent(s),
                batchId: o,
                lastValidBlockHeight: i
            })
        }),
        n.bs58.encode(e.signatures[0]))
    },
    68166: function(e) {
        e.exports = JSON.parse('{"address":"6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P","metadata":{"name":"pump","version":"0.1.0","spec":"0.1.0","description":"Created with Anchor"},"instructions":[{"name":"buy","docs":["Buys tokens from a bonding curve."],"discriminator":[102,6,61,18,1,218,235,234],"accounts":[{"name":"global","pda":{"seeds":[{"kind":"const","value":[103,108,111,98,97,108]}]}},{"name":"fee_recipient","writable":true},{"name":"mint"},{"name":"bonding_curve","writable":true,"pda":{"seeds":[{"kind":"const","value":[98,111,110,100,105,110,103,45,99,117,114,118,101]},{"kind":"account","path":"mint"}]}},{"name":"associated_bonding_curve","writable":true,"pda":{"seeds":[{"kind":"account","path":"bonding_curve"},{"kind":"const","value":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{"kind":"account","path":"mint"}],"program":{"kind":"const","value":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{"name":"associated_user","writable":true},{"name":"user","writable":true,"signer":true},{"name":"system_program","address":"11111111111111111111111111111111"},{"name":"token_program","address":"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"},{"name":"rent","address":"SysvarRent111111111111111111111111111111111"},{"name":"event_authority","pda":{"seeds":[{"kind":"const","value":[95,95,101,118,101,110,116,95,97,117,116,104,111,114,105,116,121]}]}},{"name":"program"}],"args":[{"name":"amount","type":"u64"},{"name":"max_sol_cost","type":"u64"}]},{"name":"create","docs":["Creates a new coin and bonding curve."],"discriminator":[24,30,200,40,5,28,7,119],"accounts":[{"name":"mint","writable":true,"signer":true},{"name":"mint_authority","pda":{"seeds":[{"kind":"const","value":[109,105,110,116,45,97,117,116,104,111,114,105,116,121]}]}},{"name":"bonding_curve","writable":true,"pda":{"seeds":[{"kind":"const","value":[98,111,110,100,105,110,103,45,99,117,114,118,101]},{"kind":"account","path":"mint"}]}},{"name":"associated_bonding_curve","writable":true,"pda":{"seeds":[{"kind":"account","path":"bonding_curve"},{"kind":"const","value":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{"kind":"account","path":"mint"}],"program":{"kind":"const","value":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{"name":"global","pda":{"seeds":[{"kind":"const","value":[103,108,111,98,97,108]}]}},{"name":"mpl_token_metadata","address":"metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"},{"name":"metadata","writable":true,"pda":{"seeds":[{"kind":"const","value":[109,101,116,97,100,97,116,97]},{"kind":"const","value":[11,112,101,177,227,209,124,69,56,157,82,127,107,4,195,205,88,184,108,115,26,160,253,181,73,182,209,188,3,248,41,70]},{"kind":"account","path":"mint"}],"program":{"kind":"const","value":[11,112,101,177,227,209,124,69,56,157,82,127,107,4,195,205,88,184,108,115,26,160,253,181,73,182,209,188,3,248,41,70]}}},{"name":"user","writable":true,"signer":true},{"name":"system_program","address":"11111111111111111111111111111111"},{"name":"token_program","address":"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"},{"name":"associated_token_program","address":"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"},{"name":"rent","address":"SysvarRent111111111111111111111111111111111"},{"name":"event_authority","pda":{"seeds":[{"kind":"const","value":[95,95,101,118,101,110,116,95,97,117,116,104,111,114,105,116,121]}]}},{"name":"program"}],"args":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"uri","type":"string"}]},{"name":"initialize","docs":["Creates the global state."],"discriminator":[175,175,109,31,13,152,155,237],"accounts":[{"name":"global","writable":true,"pda":{"seeds":[{"kind":"const","value":[103,108,111,98,97,108]}]}},{"name":"user","writable":true,"signer":true},{"name":"system_program","address":"11111111111111111111111111111111"}],"args":[]},{"name":"sell","docs":["Sells tokens into a bonding curve."],"discriminator":[51,230,133,164,1,127,131,173],"accounts":[{"name":"global","pda":{"seeds":[{"kind":"const","value":[103,108,111,98,97,108]}]}},{"name":"fee_recipient","writable":true},{"name":"mint"},{"name":"bonding_curve","writable":true,"pda":{"seeds":[{"kind":"const","value":[98,111,110,100,105,110,103,45,99,117,114,118,101]},{"kind":"account","path":"mint"}]}},{"name":"associated_bonding_curve","writable":true,"pda":{"seeds":[{"kind":"account","path":"bonding_curve"},{"kind":"const","value":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{"kind":"account","path":"mint"}],"program":{"kind":"const","value":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{"name":"associated_user","writable":true},{"name":"user","writable":true,"signer":true},{"name":"system_program","address":"11111111111111111111111111111111"},{"name":"associated_token_program","address":"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"},{"name":"token_program","address":"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"},{"name":"event_authority","pda":{"seeds":[{"kind":"const","value":[95,95,101,118,101,110,116,95,97,117,116,104,111,114,105,116,121]}]}},{"name":"program"}],"args":[{"name":"amount","type":"u64"},{"name":"min_sol_output","type":"u64"}]},{"name":"set_params","docs":["Sets the global state parameters."],"discriminator":[27,234,178,52,147,2,187,141],"accounts":[{"name":"global","writable":true,"pda":{"seeds":[{"kind":"const","value":[103,108,111,98,97,108]}]}},{"name":"user","writable":true,"signer":true},{"name":"system_program","address":"11111111111111111111111111111111"},{"name":"event_authority","pda":{"seeds":[{"kind":"const","value":[95,95,101,118,101,110,116,95,97,117,116,104,111,114,105,116,121]}]}},{"name":"program"}],"args":[{"name":"fee_recipient","type":"pubkey"},{"name":"initial_virtual_token_reserves","type":"u64"},{"name":"initial_virtual_sol_reserves","type":"u64"},{"name":"initial_real_token_reserves","type":"u64"},{"name":"token_total_supply","type":"u64"},{"name":"fee_basis_points","type":"u64"},{"name":"withdraw_authority","type":"pubkey"}]},{"name":"withdraw","docs":["Allows the admin to withdraw liquidity for a migration once the bonding curve completes"],"discriminator":[183,18,70,156,148,109,161,34],"accounts":[{"name":"global","pda":{"seeds":[{"kind":"const","value":[103,108,111,98,97,108]}]}},{"name":"last_withdraw","writable":true,"pda":{"seeds":[{"kind":"const","value":[108,97,115,116,45,119,105,116,104,100,114,97,119]}]}},{"name":"mint"},{"name":"bonding_curve","writable":true,"pda":{"seeds":[{"kind":"const","value":[98,111,110,100,105,110,103,45,99,117,114,118,101]},{"kind":"account","path":"mint"}]}},{"name":"associated_bonding_curve","writable":true,"pda":{"seeds":[{"kind":"account","path":"bonding_curve"},{"kind":"const","value":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{"kind":"account","path":"mint"}],"program":{"kind":"const","value":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{"name":"associated_user","writable":true},{"name":"user","writable":true,"signer":true},{"name":"system_program","address":"11111111111111111111111111111111"},{"name":"token_program","address":"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"},{"name":"rent","address":"SysvarRent111111111111111111111111111111111"},{"name":"event_authority","pda":{"seeds":[{"kind":"const","value":[95,95,101,118,101,110,116,95,97,117,116,104,111,114,105,116,121]}]}},{"name":"program"}],"args":[]}],"accounts":[{"name":"BondingCurve","discriminator":[23,183,248,55,96,216,172,96]},{"name":"Global","discriminator":[167,232,232,177,200,108,114,127]},{"name":"LastWithdraw","discriminator":[203,18,220,103,120,145,187,2]}],"events":[{"name":"CompleteEvent","discriminator":[95,114,97,156,212,46,152,8]},{"name":"CreateEvent","discriminator":[27,114,169,77,222,235,99,118]},{"name":"SetParamsEvent","discriminator":[223,195,159,246,62,48,143,131]},{"name":"TradeEvent","discriminator":[189,219,127,211,78,230,97,238]}],"errors":[{"code":6000,"name":"NotAuthorized","msg":"The given account is not authorized to execute this instruction."},{"code":6001,"name":"AlreadyInitialized","msg":"The program is already initialized."},{"code":6002,"name":"TooMuchSolRequired","msg":"slippage: Too much SOL required to buy the given amount of tokens."},{"code":6003,"name":"TooLittleSolReceived","msg":"slippage: Too little SOL received to sell the given amount of tokens."},{"code":6004,"name":"MintDoesNotMatchBondingCurve","msg":"The mint does not match the bonding curve."},{"code":6005,"name":"BondingCurveComplete","msg":"The bonding curve has completed and liquidity migrated to raydium."},{"code":6006,"name":"BondingCurveNotComplete","msg":"The bonding curve has not completed."},{"code":6007,"name":"NotInitialized","msg":"The program is not initialized."},{"code":6008,"name":"WithdrawTooFrequent","msg":"Withdraw too frequent"}],"types":[{"name":"BondingCurve","type":{"kind":"struct","fields":[{"name":"virtual_token_reserves","type":"u64"},{"name":"virtual_sol_reserves","type":"u64"},{"name":"real_token_reserves","type":"u64"},{"name":"real_sol_reserves","type":"u64"},{"name":"token_total_supply","type":"u64"},{"name":"complete","type":"bool"}]}},{"name":"CompleteEvent","type":{"kind":"struct","fields":[{"name":"user","type":"pubkey"},{"name":"mint","type":"pubkey"},{"name":"bonding_curve","type":"pubkey"},{"name":"timestamp","type":"i64"}]}},{"name":"CreateEvent","type":{"kind":"struct","fields":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"uri","type":"string"},{"name":"mint","type":"pubkey"},{"name":"bonding_curve","type":"pubkey"},{"name":"user","type":"pubkey"},{"name":"creator","type":"pubkey"}]}},{"name":"Global","type":{"kind":"struct","fields":[{"name":"initialized","type":"bool"},{"name":"authority","type":"pubkey"},{"name":"fee_recipient","type":"pubkey"},{"name":"initial_virtual_token_reserves","type":"u64"},{"name":"initial_virtual_sol_reserves","type":"u64"},{"name":"initial_real_token_reserves","type":"u64"},{"name":"token_total_supply","type":"u64"},{"name":"fee_basis_points","type":"u64"}]}},{"name":"LastWithdraw","type":{"kind":"struct","fields":[{"name":"last_withdraw_timestamp","type":"i64"}]}},{"name":"SetParamsEvent","type":{"kind":"struct","fields":[{"name":"fee_recipient","type":"pubkey"},{"name":"initial_virtual_token_reserves","type":"u64"},{"name":"initial_virtual_sol_reserves","type":"u64"},{"name":"initial_real_token_reserves","type":"u64"},{"name":"token_total_supply","type":"u64"},{"name":"fee_basis_points","type":"u64"}]}},{"name":"TradeEvent","type":{"kind":"struct","fields":[{"name":"mint","type":"pubkey"},{"name":"sol_amount","type":"u64"},{"name":"token_amount","type":"u64"},{"name":"is_buy","type":"bool"},{"name":"user","type":"pubkey"},{"name":"timestamp","type":"i64"},{"name":"virtual_sol_reserves","type":"u64"},{"name":"virtual_token_reserves","type":"u64"},{"name":"real_sol_reserves","type":"u64"},{"name":"real_token_reserves","type":"u64"}]}}]}')
    }
}]);
