var app = new Vue({
    el: '#app',
    data: {
        text: 'Hvem er kryptokongen?',
        showLastCharacter: true,
        activeTransition: false,
        showRefreshButton: false,
    },
    created: function () {
        setInterval(this.logger, 500);
        setTimeout(
            function () {
                app.refreshText()
            }, 3000
        )
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
            if (!this.activeTransition) {
                let word = this.getRandomText();
                this.activeTransition = true;
                this.slowAddText(this.text, word);
            }
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
                        app.text = app.text + newtext.charAt(0);
                        newtext = newtext.substr(1);
                        if (newtext.length === 0) {
                            app.activeTransition = false;
                            app.showRefreshButton = true;
                        } else {
                            app.slowAddText(oldtext, newtext);
                        }
                    }, pausetime
                )
            }
        },
        getRandomText() {
            if (Math.random() > 0.25) {
                return "Been"
            } else {
                return "Jens"
            }
        }
    }
})