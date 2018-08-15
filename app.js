var app = new Vue({
    el: '#app',
    data: {
        text: 'Hvem er kryptokongen?',
        nextText: '',
        showRefreshButton: false,
        activeTextTransition: true,
        showUnderscoreBlinkingAnimation: true,
    },
    created: function () {
        this.getNextTextFromServer();
        setTimeout(() => app.refreshText(), 3000)
    },
    methods: {
        pressRefreshButton() {
            if (!this.activeTextTransition) {
                this.refreshText();
            }
        },
        refreshText() {
            const word = this.nextText;
            this.getNextTextFromServer();
            this.slowAddText(this.text, word);
        },
        slowAddText(oldtext, newtext) {
            this.showUnderscoreBlinkingAnimation = false;
            this.activeTextTransition = true;
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
                            app.showUnderscoreBlinkingAnimation = true;
                            app.activeTextTransition = false;
                            app.showRefreshButton = true;
                        } else {
                            app.slowAddText(oldtext, newtext);
                        }
                    }, pausetime
                )
            }
        },
        async getNextTextFromServer() {
            const response = await fetch("https://api.kryptokongen.com/string")
            const json = await response.json();
            this.nextText = json;
        }
    }
})