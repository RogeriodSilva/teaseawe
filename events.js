const Events = {
    filterText: function (text, filter) {

    },
    removeArray: function (array, value) {

        var new_array = [];

        array.forEach(element => {
            if (element != value) {
                new_array.push(element);
            }
        });

        return new_array;
    },
    createLine: function (text, reset = false, moreclass = '') {
        var LineTable = document.querySelector('#console_line table');

        LineTable.innerHTML += `
            <tr class="">
                <td class="text-break ${moreclass}">${text}</td>
            </tr>
        `;

        if (reset) {
            LineTable.innerHTML = '';
        }
    },
    splitAdvancd: function (text, char) {

        var result = [];
        var currentPos = 0;
        var openString = false;
        var max = (text.length - 1);

        for (let LETRA = 0; LETRA <= max; LETRA++) {

            if (text[LETRA] == '"') {
                var selfPos = LETRA + 1;

                openString = true;
                currentPos = selfPos;

                while (openString) {

                    if (text[selfPos] != '"' && LETRA < max) {
                        selfPos++;
                        continue
                    }

                    LETRA = selfPos + 1;
                    openString = false;
                }

                result.push(text.substring(currentPos, selfPos));
                currentPos = selfPos + 1;

                if (LETRA + 1 > max) {
                    continue;
                }
            }

            if (!openString) {
                if (text[LETRA] == ' ') {

                    if (text.substring(currentPos, LETRA) != '') {
                        result.push(text.substring(currentPos, LETRA));
                    }

                    currentPos = LETRA + 1;

                } else if (LETRA + 1 > max) {

                    result.push(text.substring(currentPos, LETRA + 1));

                }
            }

        }
        return result;
    }
}

var param;
const commands = {

    'say': {
        desc: 'Exibe uma mensagem no console',
        exec: function () {
            Events.createLine(`[Admin]: ${param[0]}`);
        },
    },

    'test' : {
        desc : 'Isso é uma descrição!',
    },

    'clear': {
        desc: 'Limpa o console',
        exec: function () {
            Events.createLine('', true);
        }
    }
};

commands.help = {
    exec: function () {
        for (const [key, value] of Object.entries(commands)) {
            if (value.desc != undefined) {
                Events.createLine(`<b>${key}</b>: ${value.desc}`, false, 'fw-light');
            }
        }
    }
}

function exec_command(line, a) {

    if (line != '') {
        var bar = document.querySelector('#console_command');
        var params = Events.splitAdvancd(line, ' ');
        var command = params[0];

        param = Events.removeArray(params, command);

        for (const [key, value] of Object.entries(commands)) {
            if (key.toLowerCase() == command.toLowerCase()) {

                Events.createLine(line,false, 'fw-semibold');
                return value.exec();

            }
        }
    }

}