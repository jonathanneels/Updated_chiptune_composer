CHIRPTRACKER = {

    basepalette: {
        select: "#f84",
        selectBackground: "rgba(200, 100, 100, 0.25)",
        background: "#33434d",
        background2: "#2d3d47",
        line0: "#0f1f29",
        line1: "#21313b",
        line2: "#2b3b45",
        workspace: "#2b3b45",
        blackNote: "#67b3ad",
        whiteNote: "#a8d8b2",
        blackKey: "#2b3439",
        whiteKey: "#818a90",
        foreground: "#5f686d"
    },

    tracksColors: [
        "#597915",
        "#791559",
        "#155979",
        "#361579",
        "#157936",
        "#793615",
        "#8d7609"
    ],

    keys: "zsxdcvgbhnjm,l.;/q2w3er5t6y7ui9o0p[=]",
    specialkeys: {
        188: ",",
        190: ".",
        191: "/",
        186: ";",
        222: "'",
        219: "[",
        221: "]",
        187: "="
    },

    keycodes: {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "delete",
        8: "backspace",
        9: "tab",
        13: "enter",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "capslock",
        27: "escape",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        144: "numlock",
        145: "scrolllock",
        186: "semicolon",
        187: "equal",
        188: "comma",
        189: "dash",
        190: "period",
        191: "slash",
        192: "graveaccent",
        219: "openbracket",
        220: "backslash",
        221: "closebraket",
        222: "singlequote"
    },

    names: ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"],

    pressedNotes: {},

    keystate: {},

    baseOctave: 3,

    mouseButtonsState: [],

    left: 0,
    top: 0,

    images: {},
    instrumentIcons: {},

    server: location.origin,

    recording: false,

    copyProperties: function(properties, object) {
        var result = {};

        for (var i = 0; i < properties.length; i++) {
            var key = properties[i];
            result[key] = object[key];
        }

        return result;
    },

    get: function(url, data, callback) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.server + "/" + url, true);
        xhr.onload = function() {
            callback(false, this.responseText);
        };
        xhr.onerror = function() {
            callback(true);
        };

        xhr.send(JSON.stringify(data));
    },

    post: function(url, data, callback) {

        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.server + "/" + url, true);
        xhr.onload = function() {
            callback(false, this.responseText);
        };
        xhr.onerror = function() {
            callback(true);
        };

        xhr.send(JSON.stringify(data));
    },

    getImage: function(key) {
        if (!this.images[key]) {
            var image = new Image;
            this.images[key] = image;
            image.src = "data:image/png;base64," + this.rawImages[key];
        }

        return this.images[key];
    },



    getInstrumentIcon: function(name, color) {
        var key = name + color;

        if (!this.instrumentIcons[name + color]) {


            var image = cq(this.assets.image("instruments/" + name));
            image.blend(color, "hardLight", 1.0);
            this.instrumentIcons[key] = image.canvas;
        }

        return this.instrumentIcons[key];
    },

    xgetInstrumentIcon: function(key) {
        if (!this.instrumentIcons[key]) {
            var image = new Image;
            this.instrumentIcons[key] = image;
            image.src = CHIRP.instruments[key].prototype.icon;
        }

        return this.instrumentIcons[key];
    },

    extend: function() {
        for (var i = 1; i < arguments.length; i++) {
            for (var j in arguments[i]) {
                arguments[0][j] = arguments[i][j];
            }
        }

        return arguments[0];
    },

    cleanArray: function(array, property) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === null || (property && array[i][property])) {
                array.splice(i--, 1);
                len--;
            }
        }
    },

    rectInRect: function(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
        return !(r2x > r1x + r1w ||
            r2x + r2w < r1x ||
            r2y > r1y + r1h ||
            r2y + r2h < r1y);
    },

    random: function(a, b) {

        if (a === undefined) {
            return Math.random();
        } else if (b !== undefined) {
            return a + Math.random() * Math.abs(b - a + 1) | 0;
        } else {
            if (a instanceof Array) return a[(a.length + 1) * Math.random() - 1 | 0];
            else {
                return a[this.randomElement(Object.keys(a))];
            }
        }

    },

    easeOutBounce: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },

    distance: function(x1, y1, x2, y2) {
        if (arguments.length > 2) {
            var dx = x1 - x2;
            var dy = y1 - y2;

            return Math.sqrt(dx * dx + dy * dy);
        } else {
            return Math.abs(x1 - y1);
        }
    },

    codeToChar: function(code) {
        if (this.specialkeys[code]) return this.specialkeys[code];
        return String.fromCharCode(code).toLowerCase();
    },

    shiftPalette: function(palette, h, s, l) {
        var result = {};
        for (var i in palette) {
            result[i] = cq.color(palette[i]).shiftHsl(h, s, l).toHex();
        }

        return result;
    },

    kill: function() {

    },

    load: function(data) {

        console.log(data);
        this.rack.kill();
        this.engine.open(data);

        this.rack.load();

        //    this.kill();

        //  this.boot(this.engine);



    },

    save: function() {

        var data = {
            meta: this.engine.meta,
            format: "basic",
            bpm: this.engine.bpm,
            length: this.engine.length
        };

        data.tracks = [];

        var properties = ["start", "duration", "key"];

        for (var i = 0; i < this.engine.tracks.length; i++) {
            var track = this.engine.tracks[i];

            for (var j = 0; j < track.clips.length; j++) {
                delete track.clips[j].timestamp;
            }

            for (var j = 0; j < track.notes.length; j++) {
                track.notes[i] = CHIRPTRACKER.copyProperties(properties, track.notes[i]);
            }

            data.tracks[i] = {
                instrumentPlugin: track.instrument.pluginName,
                instrumentData: track.instrument.save(),
                notes: track.notes,
                clips: track.clips
            }
        }


        return data;
    },

    startRecording: function() {
        this.recorder.record();
        this.recording = true;
    },

    stopRecording: function() {
        this.recording = false;
        this.recorder.stop();

        var self = this;

        this.recorder.exportWAV(function(blob) {
            console.log(blob)
            Recorder.forceDownload(blob, CHIRPTRACKER.engine.meta.title + ".wav");
        });
    },

    boot: function(engine) {

        this.loader = new ENGINE.Loader();
        this.assets = new ENGINE.Assets(this.loader);

        this.loader.foo(100);

        this.assets.addImage("arrow-markers.png");
        this.assets.addImages("pianoroll-keys-outer-shadow.png", "pianoroll-keys-shadow.png", "pianoroll-top-shadow.png");
        this.assets.addImages("instruments/soundtoy.png", "instruments/drumkit.png", "instruments/osc.png", "instruments/soundbank.png");

        this.loader.ready(this.onready.bind(this));
        this.engine = engine;

    },

    onready: function() {
        //    this.palette = this.shiftPalette(this.basepalette, -0.1, -0.15, 0.15);
        this.palette = this.shiftPalette(this.basepalette, -0.1, -0.3, 0.4);
        //this.palette = this.shiftPalette(this.basepalette, -0.5, 0.5, 0);
        this.palette = this.basepalette;

        this.tracksColorsBag = new ENGINE.ShuffleBag(this.tracksColors);

        this.recorder = new Recorder(this.engine.output);

        this.effectsChannels = [];

        for (var i = 0; i < 5; i++) {
            this.effectsChannels[i] = new CHIRPTRACKER.EffectsChannel();
        }

        this.effectsChannels[1].effects[0] = new CHIRP.effects.environment(CHIRPTRACKER.engine, {});
        this.effectsChannels[1].route();

        this.gui = new CHIRPTRACKER.GUI(this);

        this.trackViews = [];

        this.time = 0;
        this.playMode = true;

        this.canvas = document.createElement("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.layer = this.canvas.getContext("2d");

        this.canvas.addEventListener("contextmenu", function(e) {
            e.preventDefault();
        });

        this.layer.webkitImageSmoothingEnabled = false;

        document.body.appendChild(this.canvas);

        window.addEventListener("keydown", this.onkeydown.bind(this));
        window.addEventListener("keyup", this.onkeyup.bind(this));

        this.canvas.addEventListener("mousedown", this.onmousedown.bind(this));
        this.canvas.addEventListener("mousemove", this.onmousemove.bind(this));
        this.canvas.addEventListener("mouseup", this.onmouseup.bind(this));

        this.canvas.addEventListener("mousewheel", this.onmousewheel.bind(this), false);

        setInterval(this.onstep.bind(this), 1000 / 24);

        /* jamming track */

        this.pianoRoll = new CHIRPTRACKER.PianoRoll({
            engine: this.engine,
            left: 0,
            top: window.innerHeight - 320,
            width: window.innerWidth,
            height: 320
        });

        this.gui.add(this.pianoRoll);

        this.rack = new CHIRPTRACKER.Rack({
            engine: this.engine,
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: 0
        });

        this.gui.add(this.rack);

        this.lastTick = Date.now();

        if (!this.engine.meta) {
            this.engine.meta = {
                title: "My happy song",
                author: "Your happy name",
                url: "http://yourhappywebsite.com",
                public: false
            }
        }

        /* butttons */

        this.gui.add(new CHIRPTRACKER.GUI.Button({
            left: 0,
            top: 0,
            width: 64,
            height: 24,
            text: "disk",
            onclick: function() {
                CHIRPTRACKER.menu.show();
            }
        }));
        /*
    this.gui.add(new CHIRPTRACKER.GUI.Button({
      left: 0,
      top: this.pianoRoll.top - 24,
      width: 64,
      height: 24,
      text: "bpm",
      background: "#4fc",
      onclick: function() {
        var bpm = prompt("BPM", CHIRPTRACKER.engine.bpm);
        if (bpm) CHIRPTRACKER.engine.setTempo(bpm | 0);
      }
    }));

    this.gui.add(new CHIRPTRACKER.GUI.Button({
      left: 64,
      top: this.pianoRoll.top - 24,
      width: 128,
      height: 24,
      background: "#fa0",
      text: "tutorial",
      onclick: function() {
        CHIRPTRACKER.openURL("https://github.com/rezoner/chirp/wiki/Chirp-composer---reference");
      }
    }));

    var buttons = [
      ["donate to keep development alive", "#c48", 256,
        function() {
          document.getElementById("donate").submit();
        }
      ],
      ["cloud hosted on e24", "#48c", 164, "https://panel.e24cloud.com/referal/rEeqee22"],
      ["my soundcloud", "#e42", 128, "http://soundcloud.com/rezoner"],
      ["play my game", "#a58", 128, "http://qbqbqb.rezoner.net"],
      ["join the community", "#6a0", 150, "http://www.reddit.com/r/chirpers"],
      ["follow me on twitter", "#09c", 164, "https://twitter.com/rezoner"]
    ];


    var button = buttons[Math.random() * buttons.length | 0];

    if (typeof button[3] === "string") {
      var func = function() {
        CHIRPTRACKER.openURL(button[3]);
      }
    } else {
      var func = button[3];
    }
    this.gui.add(new CHIRPTRACKER.GUI.Button({
      left: window.innerWidth - button[2],
      top: this.pianoRoll.top - 24,
      width: button[2],
      height: 24,
      background: button[1],
      color: "#fff",
      text: button[0],
      onclick: func
    }));


    this.gui.add(new CHIRPTRACKER.GUI.Button({
      left: 216,
      top: this.pianoRoll.top - 24,
      width: 128,
      height: 24,
      background: "transparent",
      text: "press space to play",
      onclick: function() {

      }
    }));
*/
    },


    openURL: function(url) {
        var win = window.open(url, '_blank');
        win.focus();
    },

    positionIndex: function(track, position, end) {
        for (var i = 0; i < track.notes.length; i++) {
            var note = track.notes[i];

            if (note.start >= position) {
                return i;
            }
        }

        return track.notes.length;
    },


    addNote: function(track, start, duration, key) {

        var index = CHIRPTRACKER.positionIndex(track, start);

        var note = {
            start: start,
            key: key,
            duration: duration
        };

        track.notes.splice(index, 0, note);

        return note;
    },

    addClip: function(track, start, duration, name, notes) {
        for (var i = 0; i < notes.length; i++) {
            var note = notes[i];
            this.addNote(track, start + note[0], note[1], note[2]);
        }

        track.clips.push({
            start: start,
            duration: duration,
            name: name,
            timestamp: this.time
        });

    },

    updateTrack: function(track) {
        track.notes.sort(function(a, b) {
            return a.start - b.start;
        });

        for (var i = 0; i < track.notes.length; i++) {
            track.notes[i].index = i;
        }

        this.calculateEnding();
    },

    calculateEnding: function() {
        var max = 0;
        for (var i = 0, len = this.engine.tracks.length; i < len; i++) {
            var track = this.engine.tracks[i];
            var last = track.notes[track.notes.length - 1];
            if (!last) continue;

            if (last.start + last.duration > max) {
                max = last.start + last.duration;
            }
        }

        this.engine.length = (Math.ceil(max / 4) * 4) || 4;

    },

    onstep: function() {
        if (this.recording) return false;
        var tick = Date.now();
        var delta = (tick - this.lastTick) / 1000;

        this.time += delta;

        this.layer.fillStyle = this.palette.workspace;
        this.layer.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.gui.onstep(delta);
        this.gui.onrender(delta);

        this.lastTick = tick;
    },

    onplaymodekeydown: function(keyCode, keyName, keyChar) {
        if (CHIRPTRACKER.mouseButtonsState[2]) {
            switch (keyName) {
                case "q":
                    this.pianoRoll.quantibe();
                    break;
                case "w":
                    this.pianoRoll.quantize(true);
                    break;
                case "d":
                    this.pianoRoll.shiftRight();
                    break;
                case "a":
                    this.pianoRoll.shiftLeft();
                    break;
                case "1":
                    this.pianoRoll.setStep(1);
                    break;
                case "2":
                    this.pianoRoll.setStep(0.5);
                    break;
                case "3":
                    this.pianoRoll.setStep(1 / 3);
                    break;
                case "4":
                    this.pianoRoll.setStep(0.25);
                    break;
                case "5":
                    this.pianoRoll.setStep(0.125);
                    break;
            }
        } else {
            var index = this.keys.indexOf(keyChar);

            if (index > -1) {

                if (index > 16) index -= 5;

                var octave = index / CHIRP.frequencies.length | 0;
                var key = index % CHIRP.frequencies.length | 0;
                var absoluteKey = (this.baseOctave + octave) * 12 + key;

                this.pressedNotes[absoluteKey] = true;

                this.pianoRoll.onnotepress(key, octave, absoluteKey);
            }
        }

    },

    onplaymodekeyup: function(keyCode, keyName, keyChar) {

        var index = this.keys.indexOf(keyChar);

        if (index > -1) {

            if (index > 16) index -= 5;

            var octave = index / CHIRP.frequencies.length | 0;
            var key = index % CHIRP.frequencies.length | 0;
            var absoluteKey = (this.baseOctave + octave) * 12 + key;

            this.pressedNotes[absoluteKey] = false;

            this.pianoRoll.onnoterelease(key, octave, absoluteKey);
        }
    },

    ontoolmodekeydown: function(keyCode, keyName, keyChar) {

    },

    ontoolmodekeyup: function() {

    },

    onkeydown: function(e) {

        if (this.lockKeyboard) return;

        if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
        else var keyName = this.keycodes[e.which];

        if (this.keystate[keyName]) return;
        this.keystate[keyName] = true;

        var keyChar = this.codeToChar(e.which);

        switch (keyName) {
            case "up":
                this.rack.offset = Math.max(-this.rack.height + 64 * 2 + 8, this.rack.offset - 64);
                this.rack.refreshViews();
                break;
            case "down":
                this.rack.offset = Math.min(0, this.rack.offset + 64);
                this.rack.refreshViews();
                break;
            case "left":
                this.baseOctave = Math.max(0, this.baseOctave - 1);
                break;
            case "right":
                this.baseOctave = Math.min(4, this.baseOctave + 1);
                break;
            case "space":
                if (this.engine.playing) {
                    this.jamPosition = 0;
                    this.pianoRoll.track.noteIndex = 0;
                    this.engine.restart();
                    this.engine.pause();
                } else {
                    this.engine.play();
                }
                break;
            case "tab":
                // this.playMode = !this.playMode;
                this.pianoRoll.toggleFullscreen();
                break;
        }

        this[this.playMode ? "onplaymodekeydown" : "ontoolmodekeydown"](e.which, keyName, keyChar);

        e.preventDefault();

        return false;
    },

    onkeyup: function(e) {

        if (this.lockKeyboard) return;

        if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
        else var keyName = this.keycodes[e.which];

        this.keystate[keyName] = false;

        var keyChar = this.codeToChar(e.which);
        this[this.playMode ? "onplaymodekeyup" : "ontoolmodekeyup"](e.which, keyName, keyChar);



        return false;
    },

    onmousedown: function(e) {
        CHIRPTRACKER.mouseButtonsState[e.which] = true;

        this.gui.onmousedown(e.pageX, e.pageY, e.which);

        e.preventDefault();
    },

    onmouseup: function(e) {
        CHIRPTRACKER.mouseButtonsState[e.which] = false;

        this.gui.onmouseup(e.pageX, e.pageY, e.which);

        /* global events */

        this.pianoRoll.draggingClip = false;
    },

    onmousemove: function(e) {
        this.gui.onmousemove(e.pageX, e.pageY);
    },

    onmousewheel: function(e) {
        var delta = e.wheelDelta / Math.abs(e.wheelDelta);
        this.gui.onmousewheel(e.pageX, e.pageY, delta);

        e.preventDefault();
        e.returnValue = false;
        return false;
    }

};

CHIRPTRACKER.rawImages = {
    addTrack: "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QgXEzAz4TzLegAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABgSURBVGje7dcxCoAgFIBha3Z07K7hXR0dPUA3KJEHEX3fKig/Cg9TAgDes0VvWPJx3q330WrkefvXb0CAAAECBPw7YHoSP03YaLMT2xMSIECAAD8yT0iAAAECBAAALLgA11UMNg7j3XAAAAAASUVORK5CYII="
};