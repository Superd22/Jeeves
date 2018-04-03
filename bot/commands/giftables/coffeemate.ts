import { GiftableCommand } from './_giftable';
import { SpectrumUser } from 'spectrum-bot/lib/';
import { aBotCommand } from 'spectrum-bot/lib/';
import { receivedTextMessage } from 'spectrum-bot/lib/';
import { SpectrumLobby } from 'spectrum-bot/lib/';
import { aSpectrumCommand } from 'spectrum-bot/lib/';
import { DbStats } from '../_.commands';
import { pickRandom } from '../common/pickRandom';
import { GiftablesHelper } from '../common/giftables';

export class coffeemateCommand extends GiftableCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "coffeemate";
    protected statName = "coffeemate";
    public constructor() {
        super(); 
        this.registerShortCode(this.shortCode);
    }
    public messageToSend(originalUser: SpectrumUser, username: string, target: string, hasT: boolean) {
        let messages = [
            "I have selected a delightful White Chocolate Macadmia flavor coffemate for you today, " + username ,
            "Yes of course " + username + ", I have your favorite Cinnabon flavor ready now.",
            "The Red Velvet Cupcake flavor will go wonderfully with " + username + "'s coffee. :coffee:",
            "Girl Scout cookie Thin Mint flavor coffeemate for " + username + " today!",
            "The special seasonal coffeemate flavor Eggnog Latte has enhanced your coffee for you " + username + ".",
            "A special Coldstone Creamery Founders Favorite has been added to " + username + "s :coffee: " + (hasT ? "Courtesy of the dear " + originalUser.mention() + "." : ""),
        ];

        return pickRandom(messages);
    }

    public name = "Serve Coffeemate";
    public manual = "Serves Coffeemate.";
}
