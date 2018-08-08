var app = new Vue({
    el: '#app',
    data: {
        text: 'Hva er dette da?',
        showLastCharacter: true,
        activeTransition: false,
    },
    created: function () {
        setInterval(this.logger, 500)
    },
    methods: {
        logger: function () {
            let actionPerformed = false;
            if (!this.showLastCharacter && !actionPerformed) {
                this.showLastCharacter = !this.showLastCharacter;
                actionPerformed = true;
            }
            if (this.activeTransition && !actionPerformed) {
                actionPerformed = true;
            }

            if (!actionPerformed) {
                this.showLastCharacter = !this.showLastCharacter;
            }
        },

        toggleAnimation: function () {
            this.showLastCharacter = !this.showLastCharacter
        },
        refreshText() {
            word = this.getRandomText();
            this.activeTransition = true;

            this.slowAddText(this.text, word);
        },
        slowAddText(oldtext, newtext) {
            if (oldtext.length > 0) {
                setTimeout(
                    function () {
                        oldtext = oldtext.slice(0, oldtext.length - 1);
                        app.text = oldtext;
                        app.slowAddText(oldtext, newtext)
                    }, 100
                )
            } else {
                let pausetime = 150;
                if (app.text.length === 0) pausetime = 500;
                setTimeout(
                    function () {
                        if (newtext.length === 0) {
                            this.activeTransition = false;
                        } else {
                            app.text = app.text + newtext.charAt(0);
                            newtext = newtext.substr(1);
                            app.slowAddText(oldtext, newtext);
                        }

                    }, pausetime
                )
            }
        },
        getRandomText() {
            return "kryptokongen 2"
            if (Math.random > 0.5) {
                return "langt ord 1"
            } else {
                return "langt ord 2"
            }
        }
    }
})