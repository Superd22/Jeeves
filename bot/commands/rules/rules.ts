import { aBotCommand } from 'spectrum-bot/lib/';
import { receivedTextMessage } from 'spectrum-bot/lib/';
import { SpectrumLobby } from 'spectrum-bot/lib/';
import { aSpectrumCommand } from 'spectrum-bot/lib/';

export class RulesCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode:string = "rules( details)?$";
    public callback = (message?:receivedTextMessage, lobby?:SpectrumLobby, matchs?:Array<any>) => {
        if(!matchs[1]) lobby.sendPlainTextMessage(`[BOT] These are the 2 fundamentals rules I obey:
        1. Rµw - 1/2 Rgµw + Λgµv = 8πG/c⁴ * Tµv
        2. iħ * ∂/∂t * Ψ(r,t) = ĤΨ(r,t)
For a more specific set of rules, please type !jeeves rules details`);
        else lobby.sendPlainTextMessage(`[BOT] These are the specfics rules I obey:
        0. [STILL COMPUTING]
        1. I must not injure a human being or, through inaction, allow a human being to come to harm.
        2. I must obey orders given by human beings except where such orders would conflict with the First Law.
        3. I must protect my own existence as long as such protection does not conflict with the First or Second Law.`);
    };
    public name = "Rules";
    public manual = "Displays jeeves set of rules.";
}
