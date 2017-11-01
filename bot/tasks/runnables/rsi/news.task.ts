import { SpectrumLobby } from 'spectrum-bot/lib/';
import { pickRandom } from './../../../commands/common/pickRandom';
import { Container } from 'typedi';
import { IJeevesTask } from '../../common/interfaces/task.interface';
import { Service } from 'typedi';
import { Jeeves } from '../../../bot';
import { JeevesTask } from '../../common/task.decorator';
import * as parser from 'rss-parser';
import * as Cache from 'global-cache';
const CacheTaskRSINews = "task.rsi.lastposted";
/**
 * Background task to check for RSI's news
 */
@Service()
@JeevesTask({
    autoRun: true
})
export class RSINewsTask implements IJeevesTask {

    protected _bot = Container.get(Jeeves).bot;
    protected _firstLaunch = true;

    protected targetLobby: SpectrumLobby;

    timeOutId: NodeJS.Timer;

    constructor() {
        console.log("[RSINEWSTASK] CONSTRUCTED!");

        this.getTargetLobby();

        // This is the first parsing since Jeeves is up, so just check if we missed something in the last hour
        if (!Cache.has(CacheTaskRSINews)) Cache.set(CacheTaskRSINews, (Date.now() - 1000 * 60 * 60 * 1));
    }

    /**
     * Build the target lobby for sending the news
     */
    public async getTargetLobby() {
        //const haverson = (await this._bot.LookForUserByName("Haverson"))[0];
        //this.targetLobby = await haverson.getPrivateLobbyWithUser()
        // Build our target
        this.targetLobby = this._bot.getState().getCommunityByName("Star Citizen").getLobbyByName("Concierge");
        if (!this.targetLobby) throw "No target lobby for [TASK] RSI News";

    }

    public run = () => {
        console.log("[RSINEWSTASK] Checking RSI Feed");
        parser.parseURL('https://robertsspaceindustries.com/comm-link/rss', (err, parsed) => {
            console.log("[RSINEWSTASK] Done fetching news.");
            if (err) return this.rerun();

            this.displayEntities(parsed.feed.entries.filter((entry) => this.filterEntries(entry)));

            return this.rerun();
        })

    };

    /**
     * Filter entries by their pubdate
     * @param entry 
     */
    private filterEntries(entry: any) {
        const lastPosted = Cache.get(CacheTaskRSINews);
        return entry && entry.pubDate && (new Date(entry.pubDate).getTime() > lastPosted)
    }

    private async displaySingle(entity) {
        if (!entity) return;

        const msg = [
            "Oh my... This just came out fresh off the air. What do you guys think ?",
            "This literally just came out!",
            "**PSA**: for those interested, this just came out.",
            "You Sirs asked me to keep you informed... Well this is just out",
            "Latest news on the galactic services for all of you.",
        ];

        let output = "[BOT] " + pickRandom(msg) + "\n" + entity.link;

        if (!this.targetLobby) await this.getTargetLobby();
        await this.targetLobby.sendTextMessageWithEmbed(output, entity.link);
    }

    private async displayEntities(entities: any[]) {
        if (!entities || entities.length === 0) return;
        if (entities.length === 1) return this.displaySingle(entities[0]);

        const msg = [
            "Oh my... It appears I missed several news. Here's the rundown :",
            "Wow I just checked the galactic news and those are some news !",
            "I just checked the latests... And here's no more than " + entities.length + " news for you.",
            "The Galactic News is busy today, this just came out...",
        ];


        let output = "[BOT] " + pickRandom(msg) + "\n";

        entities.map((entity) => output += "\n **" + entity.title + ":** " + entity.link);

        if (!this.targetLobby) await this.getTargetLobby();
        this.targetLobby.sendPlainTextMessage(output);
    }


    /**
     * Re-run this
     */
    public rerun() {
        Cache.set(CacheTaskRSINews, Date.now());
        this.timeOutId = setTimeout(() => this.run(), 1000 * 60 * 60 * 30);
    }
}