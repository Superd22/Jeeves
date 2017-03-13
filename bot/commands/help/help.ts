import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';

export class HelpCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "help$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        lobby.sendPlainTextMessage(`[BOT] Yes, I am a bot. More precisely I am a Butler Bot.\n
        My sole aim is to provide aid and comfort to the Admirals and Staff in #concierge.\n
        I can not presentely provide you with an exhaustive list of my commands, as my master as yet to implement that faculty in me.\n
        If you are technically inclined, you do are able to check my code at https://github.com/Superd22/Jeeves-bot \n
        Good day.`);
    };
    public name = "Help";
    public manual = "Display help";
}