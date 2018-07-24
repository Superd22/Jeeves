import { aBotCommand } from 'spectrum-bot';
import { receivedTextMessage } from 'spectrum-bot';
import { SpectrumLobby } from 'spectrum-bot';
import { aSpectrumCommand } from 'spectrum-bot';

export class isUpCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode:string = "isup";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        lobby.sendPlainTextMessage("[BOT] Yes, I am there. How may I be of service?");
    };
    public name = "Is up ?";
    public manual = "Displays whether or not the bot is currently up and running.";
}
