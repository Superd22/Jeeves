import { aBotCommand, defaultStarCitizenRoles } from 'spectrum-bot';
import { receivedTextMessage } from 'spectrum-bot';
import { SpectrumLobby } from 'spectrum-bot';
import { aSpectrumCommand } from 'spectrum-bot';
import { ISpectrumDraftJSRichText } from 'spectrum-bot';
import { convertFromRaw, convertToRaw } from 'draft-js';

export class MOTDCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode: string = "motd ?(.*)";

    protected motd: ISpectrumDraftJSRichText;
    protected targetLobby: SpectrumLobby;
    protected motdTime: Date;
    protected motdAuthor: { handle: string, role: string } = null;

    public callback = (message?: receivedTextMessage, lobby?: SpectrumLobby, matchs?: Array<any>) => {
        this.targetLobby = lobby;

        if (matchs && matchs[1]) return this.setMotd(message);
        else return this.displayMotd();
    };

    protected async displayMotd() {
        if (this.motd && this.motdTime && this.motdAuthor) {
            await this.targetLobby.sendMessage("[BOT] MOTD set on " + this.motdTime.toDateString() + " by [" + this.motdAuthor.role + "] " + this.motdAuthor.handle);
            const m = await this.targetLobby.sendMessage(this.motd);
        }
        else this.targetLobby.sendMessage("[BOT] No MOTD just yet.");
    }

    /**
     * Set the motd 
     * @param message 
     */
    protected setMotd(message: receivedTextMessage) {
        if (!this.checkAuth(message)) return this.targetLobby.sendMessage("[BOT] You are not authorized to set the motd. Please try again as an admin/staff/mod or contact my maker.");
        else {
            // remove !jeeves motd
            const motd = message.content_state;
            motd.blocks.splice(0, 1);

            // convert the motd
            this.motd = convertToRaw(convertFromRaw(motd));

            // Set our author
            const author: any = { handle: message.member.nickname };
            author.role = defaultStarCitizenRoles[Number(message.highlight_role_id)] || "User";
            this.motdAuthor = author;

            // set the date
            this.motdTime = new Date();

            // confirm
            return this.targetLobby.sendMessage("[BOT] MOTD set.");
        }
    }

    /**
     * Check if the message is auth'd to motd
     * @param message 
     */
    protected checkAuth(message: receivedTextMessage) {
        if (Number(message.highlight_role_id) <= 3) return true;
        if (message.member.nickname == "Haverson") return true;

        return false;
    }

    public name = "motd";
    public manual = "Displays or set message of the day.";
}
