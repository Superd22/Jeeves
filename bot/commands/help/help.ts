import { aBotCommand } from 'spectrum-bot/lib/Spectrum/components/command.component';
import { receivedTextMessage } from 'spectrum-bot/lib/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from 'spectrum-bot/lib/Spectrum/components/lobby.component';
import { aSpectrumCommand } from 'spectrum-bot/lib/Spectrum/interfaces/command.interface';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';

export class HelpCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "help$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        lobby.sendPlainTextMessage(`[BOT] Yes, I am a bot. More precisely I am a Butler Bot.\nMy sole aim is to provide aid and comfort to the Admirals and Staff in #concierge.\nI can not presentely provide you with an exhaustive list of my commands, as my master as yet to implement that faculty in me.\nIf you are technically inclined, you do are able to check my code at https://github.com/Superd22/Jeeves-bot \n
        Good day.`);
    };
    public name = "Help";
    public manual = "Display help";
}