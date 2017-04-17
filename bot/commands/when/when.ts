import { aBotCommand } from 'spectrum-bot/lib/Spectrum/components/command.component';
import { receivedTextMessage } from 'spectrum-bot/lib/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from 'spectrum-bot/lib/Spectrum/components/lobby.component';
import { aSpectrumCommand } from 'spectrum-bot/lib/Spectrum/interfaces/command.interface';
import { pickRandom } from '../common/pickRandom';

export class WhenIsCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode:string = "when (.*)$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {

        let m = [':soon:','Soon :tm:',':soon: :tm:', 'I just checked, and it\'s soon :tm: .'];


        lobby.sendPlainTextMessage("[BOT] "+pickRandom(m));
    };
    public name = "When will ?";
    public manual = "Fetches and return release date for feature.";
}