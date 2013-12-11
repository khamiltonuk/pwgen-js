$(document).ready(function() {
    var desiredLength;
    var capOdds;
    var symbolOdds;
    var password;

    var charsets = [
        ['12345qwertasdfgzxc', '!@$%'],
        ['67890yuiophjklvbnm', '^&*()']
    ];

    $(".slider").slider({ 
        orientation: "vertical",
        slide: function(event, ui) {
            $(this).slider('value', ui.value);
            showPasswords();
            $(this.nextElementSibling.children[1]).text(ui.value);
        }
    });

    $("#number-of-passwords")
        .slider("option", "min", 1)
        .slider("option", "max", 10)
        .slider("value", 5);

    $("#password-length")
        .slider("option", "max", 20)
        .slider("option", "min", 2)
        .slider("value", 10);

    $("#cap-odds").slider("value", 25);

    $("#symbol-odds").slider("value", 0);

    $("#more").click(function () {
        showPasswords();
    });

    function determine(odds) {
        if (Math.floor(Math.random() * (100-0+1)) < odds) return true;
    }

    function randomChar(string) {
        chars = string.split('');

        return chars[Math.floor(Math.random()*chars.length)];
    }

    function generatePass() {
        desiredLength = $("#password-length").slider("value");
        capOdds       = $("#cap-odds").slider("value");
        symbolOdds    = $("#symbol-odds").slider("value");

            password = '';

            while (password.length < desiredLength) {
                side = password.length % 2 == 0 ? 1 : 0;

                if (determine(symbolOdds)) {
                    password += randomChar(charsets[side][1]);
                }

                else {
                    c = randomChar(charsets[side][0]);
                    password += determine(capOdds) ? c.toUpperCase() : c;
                }
            }

        return password;
    }

    function showPasswords() {
        amount    = $("#number-of-passwords").slider("value");
        passwords = [];
        html      = '';

        $('#passwords > div').remove();

        for (var i = 0; i < amount; i++) {
            passwords.push(generatePass());
        };

        $.each(passwords, function (index, password) {
            html += '<div class="password">' + password + '</div>\n';
        });

        $('#passwords').append(html);
    }

    showPasswords();
});