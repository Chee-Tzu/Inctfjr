document.addEventListener('DOMContentLoaded', function () {
    var welcomeBtn = document.getElementById('welcome-btn');
    var chatContainer = document.querySelector('.chat-container');

    welcomeBtn.addEventListener('click', function () {
        chatContainer.classList.add('expanded');

        var messages = [
            'Qm9iLCBJJ3ZlIGdvdCBleWVzIG9uIHRoZSBkYXRhIHZhdWx0LiBJdCdzIGFsbCBsb2NrZWQgdXAgdGlnaHQsIGJ1dCBJJ3ZlIGZvdW5kIGEgd2Vha25lc3MgaW4gdGhlaXIgc3lzdGVtLiBXZSBuZWVkIHRvIGdldCBwYXN0IHRoZWlyIGZpcmV3YWxsIGZpcnN0LiBUaGVuIHdlJ2xsIG5lZWQgdGhlIGtleS4=',
            '41682c20746865206b65792e204920666967757265642e20416e79206964656120776865726520697427732068696464656e2c206f722061726520776520646f696e67207468697320746865206861726420776179203f20',
            '.. .----. ...- . / --. --- - / .- / -.-. --- -. - .- -.-. - / .-- .... --- / --- .-- . ... / -- . / .- / ..-. .- ...- --- .-. .-.-.- / .... . .----. ... / .... .. -.. .. -. --. / .. - / .. -. / .--. .-.. .- .. -. / ... .. --. .... - --..-- / . -. -.-. .-. -.-- .--. - . -.. / .. -. / - .... . .. .-. / ... . -.-. ..- .-. .. - -.-- / ..-. . . -.. ... .-.-.- / - .... . / .--. .... .-. .- ... . / .. ... / .----. ... .. .-.. . -. - / .- ... / - .... . / ... -.- -.-- .----. / .. ..-. / .-- . / -.. . -.-. --- -.. . / .. - --..-- / .-- . / --. . - / .- -.-. -.-. . ... ... .-.-.-',
            '\'kqwiam ak moi cow\' zcs? xutt\'k t zxbelym zrr.uul bm md amjsd, ar\'ke ag.dlkx\'q fmix bgcw pl lkzc lpp orr ?',
            '174126415406692464627028588524117393674542548950013171570478365842556908383234368345429677387897191069306254555176025279841760009727450405784368762742866785769336596321868432601367512551586110840342611250872335692020142573328723212095405730953435954108025217410486249849855154881303465554851563247269265568151329640740830849850169823339122964207929807611022579580484714527484467003219693700271872931786992887645555923693922292746674168991948287140783150',
            'Jrrg. Zg yqp\'v jhw d vgeqpf fkdqfg.Aqw fhfrgh vjcv mhb, dqg K\'nn ocnh vxug qwt galw\'v fngct.Nhw\'v jhv vjg fdwd dqf fkucsshdu.'
        ];

        setTimeout(function () {
            for (let i = 0; i < messages.length; i++) {
                var chatMessage = document.createElement('section');
                chatMessage.classList.add('cyberpunk', i % 2 == 0 ? 'alice' : 'bob');
                chatMessage.textContent = messages[i];
                chatContainer.appendChild(chatMessage);
            }
            chatContainer.scrollTop = 0;
        }, 300);
    });
});
