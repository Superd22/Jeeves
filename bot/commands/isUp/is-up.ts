import { aBotCommand } from 'spectrum-bot/lib/Spectrum/components/command.component';
import { receivedTextMessage } from 'spectrum-bot/lib/Spectrum/interfaces/receivedTextMessage.interface';
import { SpectrumLobby } from 'spectrum-bot/lib/Spectrum/components/lobby.component';
import { aSpectrumCommand } from 'spectrum-bot/lib/Spectrum/interfaces/command.interface';

export class isUpCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode:string = "isup";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        lobby.sendPlainTextMessage("[BOT] Yes, I am there. How may I be of service?");
    };
    public name = "Is up ?";
    public manual = "Displays whether or not the bot is currently up and running.";
}
