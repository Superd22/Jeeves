import { aBotCommand } from '../../../spectrum-bot/src/Spectrum/components/command.component';
import { receivedTextMessage } from '../../../spectrum-bot/src/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from '../../../spectrum-bot/src/Spectrum/components/lobby.component';
import { aSpectrumCommand } from '../../../spectrum-bot/src/Spectrum/interfaces/command.interface';

export class isUpCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode:string = "isup";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        lobby.sendPlainTextMessage("[BOT] Yes, I am there. How can i be of service ?");
    };
    public name = "Is up ?";
    public manual = "Displays wheter or not the bot is currently up and running.";
}