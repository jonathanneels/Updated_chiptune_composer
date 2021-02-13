CHIRPTRACKER.menu = {

    create: function() {
        this.$menu = document.querySelector("#menu");

        this.$meta = this.$menu.querySelector(".meta");

        this.$save = this.$menu.querySelector(".save");
        this.$save.addEventListener("click", this.save.bind(this));


        this.$share = this.$menu.querySelector(".share");
        this.$edit = this.$menu.querySelector(".edit");
        this.$zip = this.$menu.querySelector(".zip");

        this.$loadInput = this.$menu.querySelector("#loadInput");
        this.$loadInput.addEventListener("change", this.handleFileChange);

        this.$saveready = this.$menu.querySelector(".saveready");

        this.$close = this.$menu.querySelector(".close");
        this.$close.addEventListener("click", this.hide.bind(this));

        this.$record = this.$menu.querySelector(".record");
        this.$record.addEventListener("click", function() {
            CHIRPTRACKER.recorderPanel.show();
            CHIRPTRACKER.menu.hide();
        });

        this.$bpm = this.$menu.querySelector(".bpm");

        this.$bpm.addEventListener("click", function() {
            var bpm = prompt("BPM", CHIRPTRACKER.engine.bpm);
            if (bpm) CHIRPTRACKER.engine.setTempo(bpm | 0);
        });

    },

    center: function() {
        this.$menu.style.left = (window.innerWidth / 2 - this.$menu.offsetWidth / 2 | 0) + "px";
        this.$menu.style.top = (window.innerHeight / 2 - this.$menu.offsetHeight / 2 | 0) + "px";
    },

    show: function() {
        this.$menu.style.display = "block";
        this.$meta.value = JSON.stringify(CHIRPTRACKER.engine.meta, null, "  ");
        this.center();
    },

    hide: function() {
        this.$menu.style.display = "none";
    },

    handleFileChange: function(event) {
        var input = this;
        var files = event.target.files;
        var file = files[0];
        var reader = new FileReader();

        reader.onload = function() {
            CHIRPTRACKER.load(JSON.parse(this.result));
        }

        reader.readAsText(file);
    },


    save: function() {
        var panel = this;

        var song = CHIRPTRACKER.save();

        this.$saveready.style.display = "none";

        try {
            var meta = JSON.parse(this.$meta.value);
        } catch (e) {
            alert("Your JSON is not really valid")
            return;
        }

        song.meta = meta;

        var blob = new Blob([JSON.stringify(song)], {
            type: "text/csv;charset=utf-8"
        });

        saveAs(blob, meta.title + ".chirp");

    }

};

CHIRPTRACKER.menu.create();