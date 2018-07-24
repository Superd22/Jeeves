import { aBotCommand } from 'spectrum-bot';
import { receivedTextMessage } from 'spectrum-bot';
import { SpectrumLobby } from 'spectrum-bot';
import { SpectrumUser } from 'spectrum-bot';
import { aSpectrumCommand } from 'spectrum-bot';

export class DiceCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode: string = "roll ([0-9]+)?d([0-9]+)$";
    public callback = (message?: receivedTextMessage, lobby?: SpectrumLobby, matchs?: Array<any>) => {

        let dice_size = Number(matchs[2]);
        let dice_number = 1;
        if (matchs[1] && Number(matchs[1]) > 0) {
            dice_size = Number(matchs[2]);
            dice_number = Number(matchs[1]);
        }

        if (!(dice_size > 0 && dice_number > 0 && dice_size <= 100 && dice_number <= 100)) {
            lobby.sendPlainTextMessage("[BOT] :game_die: Invalid dice... ");
        }
        else {
            let results = "";

            for (var i = 1; i <= dice_number; i++) {
                results += "\nd" + i + ": " + (Math.floor(Math.random() * dice_size) + 1);
            }

            if (dice_number <= 20)
                lobby.sendPlainTextMessage("[BOT] :game_die: Here are the results :game_die: :" + results);
            else
                new SpectrumUser(message.member).sendPrivateMessage("[BOT] :game_die: Here are the results :game_die: :" + results);
        }

    };
    public name = "Roll dice";
    public manual = "rolls a dice.";
}
