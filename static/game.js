$(document).ready(function () {

    $("#to-title").click(function () {
        window.location.href = "index.html"
    });

    //time
    function getUrlParameter(name) {
        urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const timeParameter = getUrlParameter('time');
    if (!timeParameter || isNaN(timeParameter)) {
        window.location.href = "error.html";
    }
    const rememberTime = parseInt(timeParameter);

    //init
    const pairs = [
        {theme: "誕生日", answer: "4月21日"},
        {theme: "好きな食べ物", answer: "果物とゼリー"},
        {theme: "得意な事", answer: "道を覚える"},
        {theme: "よくみるYoutube", answer: "東海オンエアとクサヤ人チャンネル"},
        {theme: "東京で探究したい食べたいもの", answer: "油そば"},
        {theme: "行きたいお店", answer: "まーさんの家"},
        {theme: "行きたい場所", answer: "JAXA筑波宇宙センター"},
        {theme: "好きなディズニーのアトラクション", answer: "ジャングルクルーズ"},
    ];
    const frontThemeFontColor = "#000000"
    const frontValueFontColor = "#6c6b6b"

    let cards = []
    for (let i = 0; i < pairs.length; i++) {
        cards.push({pair_id: i, value: pairs[i].theme, color: frontThemeFontColor, num: 0})
        cards.push({pair_id: i, value: pairs[i].answer, color: frontValueFontColor, num: 0})
    }

    const shuffledCards = shuffle(cards);
    const numCards = cards.length;
    let selectedCards = [];
    let matchedCards = [];
    let isStarted = false;
    let tryCount = 0

    for (let i = 0; i < cards.length; i++) {
        cards[i].num = i
    }
    renderCards()

    //game start
    setTimeout(gameStart, rememberTime * 1000);

    $('.progress-bar').animate({width: '0%'}, rememberTime * 1000, 'linear');

    function gameStart() {
        isStarted = true;
        $('.card').css('cursor', 'pointer');
        $('.card').css('background-color', backColor);
        $('.card').css('color', backFontColor);
        $('#turn-title-count').text('スタート！！！');
        $('.card').each(function () {
            const $card = $(this);
            $card.html($card.data('cardData').num);
            const $text = $card.find('.text');
            const textHeight = $text.height();
            $card.height(textHeight);
        });
    }

    // Shuffle function
    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    // Render cards
    function renderCards() {
        for (let i = 0; i < numCards; i++) {
            let $card = $('<div class="card">' + shuffledCards[i].value + '</div>');
            $('.game-board').append($card);
            $card.data('cardData', shuffledCards[i]);
        }
    }

    // Check for matches
    function checkMatch() {
        tryCount += 1
        $('#turn-title-count').html(tryCount.toString() + "回");
        if (selectedCards[0].data('cardData').pair_id === selectedCards[1].data('cardData').pair_id) {
            matchedCards.push(selectedCards[0]);
            matchedCards.push(selectedCards[1]);

            selectedCards = [];
            if (matchedCards.length === numCards) {
                const minutes = Math.floor(rememberTime / 60);
                const seconds = rememberTime % 60;
                const formattedMinutes = (minutes > 0) ? minutes.toString() + "分" : ""
                const formattedSeconds = seconds.toString() + "秒"
                const timeMessage = (rememberTime > 0) ? "記憶時間：" + formattedMinutes + formattedSeconds + ", " : ""
                const countMessage = "試行回数：" + tryCount.toString() + "回"
                setTimeout(function () {
                    alert(timeMessage + countMessage + "でクリアしました");
                }, 500);
            }
        } else {
            setTimeout(function () {
                selectedCards[0].html(selectedCards[0].data('cardData').num)
                selectedCards[0].removeClass('selected')
                selectedCards[1].html(selectedCards[1].data('cardData').num)
                selectedCards[1].removeClass('selected')
                selectedCards[0].css('background-color', backColor);
                selectedCards[1].css('background-color', backColor);
                selectedCards[0].css('color', backFontColor);
                selectedCards[1].css('color', backFontColor);
                selectedCards = [];
            }, 500);
        }
    }

    // Click event for cards
    $('.game-board').on('click', '.card', function () {
        let $this = $(this);
        if (!isStarted || $this.hasClass('selected') || $this.hasClass('matched') || selectedCards.length === 2) {
            return;
        }
        $this.css('background-color', frontColor);
        $this.css('color', $this.data('cardData').color)
        $this.addClass('selected');
        $this.html($this.data('cardData').value);
        selectedCards.push($this);
        if (selectedCards.length === 2) {
            checkMatch();
        }
    });

    const frontColor = "#ffffff"
    const backColor = "#ADD8E6"
    const backFontColor = "#ffffff"
});
