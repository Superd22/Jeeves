import { pickRandom } from './../common/pickRandom';
import { receivedTextMessage, SpectrumLobby, aSpectrumCommand } from 'spectrum-bot/lib/';
import * as Google from 'googleapis';
import { config } from '../../config/config';
import * as Cache from 'global-cache';

const CacheYoutubeATVLastFetch = "youtube.atv.lastfetch";
const CacheYoutubeATVLastResult = "youtube.atv.lastresult";

export class ATVIsOutCommand implements aSpectrumCommand {
    public listenerID;
    public shortCode = "atv is ?out ?[\?]?";

    /**
     * check if we're past thrusday or nah
     */
    private get lastWeek() {
        const rn = new Date();
        // Check if we're in last week mode or not
        return (rn.getDay() >= 1 && rn.getDay() < 4);
    }

    public callback = (message?: receivedTextMessage, lobby?: SpectrumLobby, matchs?: Array<any>) => {

        const ytApi = Google.youtube('v3');

        const lastFetch = Cache.get(CacheYoutubeATVLastFetch) || 0;

        /**
         * We can fetch if either :
         * 1/ We have nothing in cache
         * 2/ it's not last week and we haven't hit the spam limit
         */
        if (!Cache.has(CacheYoutubeATVLastResult) || (!this.lastWeek && (Date.now() > (lastFetch + 10000)))) {
            console.log("[GOOGLE API] Looking for ATV");
            // We're gonna fetch
            Cache.set(CacheYoutubeATVLastFetch, Date.now());
            // Fetch data from yt
            ytApi.search.list({
                part: 'snippet',
                channelId: 'UCTeLqJq1mXUX5WWoNXLmOIA',
                maxResults: 3,
                order: 'date',
                q: 'Around the Verse',
                key: config.googleKey
            }, (err, data) => {
                // Cache our results
                Cache.set(CacheYoutubeATVLastResult, { err: err, data: data });
                // Handle them
                this.handleYTReturn(lobby);
            });
        }
        // Just handle the return from the cache
        else this.handleYTReturn(lobby, true)
    };

    /**
     * Check the cache for the latest data we have and build a response from that
     * @param lobby the lobby in which to respond
     * @param fromCache if we are using cache and didn't fetch on this command
     */
    private handleYTReturn(lobby: SpectrumLobby, fromCache?: boolean) {
        const yt = Cache.get(CacheYoutubeATVLastResult);

        if (yt && !yt.err)
            this.displayData(yt.data, lobby, fromCache);
        else
            lobby.sendPlainTextMessage("[BOT] Oops... Something went wrong...");
    }

    /**
     * Displays the data from a yt return
     * @param data the yt return
     * @param lobby the lobby in which to display
     * @param fromCache if we are using cache and didn't on this command
     */
    private async displayData(data, lobby: SpectrumLobby, fromCache?: boolean) {

        if (data && data.items) {
            const item = data.items[0];

            // We just want last week atv.
            if (this.lastWeek) {

                const msg = [
                    "Last week's ATV was a blast !",
                    "I sure did enjoy that one.",
                    "I mean... just wow...",
                    "That was one of the best ATV in awhile.",
                    "I liked that one.",
                    "Yeah, last week was pretty cool."
                ];

                await lobby.sendTextMessageWithEmbed("[BOT] " + pickRandom(msg), "https://www.youtube.com/watch?v=" + item.id.videoId);
            }
            // We're in the week of that ATV
            else {
                const lastAtv = new Date(item.snippet.publishedAt);

                // It's out !!!
                if (this.getWeekNumber(lastAtv)  === this.getWeekNumber(new Date())) {
                    const msg = [
                        "I'm happy to say that yes, the atv is out !",
                        "OMAGAD IT'S OUT!",
                        "Yes, yes, yes it is out indeed !",
                        "You may now watch this week's ATV !",
                        "Indeed, it appears the ATV is out.",
                        "yasssssss !!!",
                    ]
                    await lobby.sendTextMessageWithEmbed("[BOT] " + pickRandom(msg), "https://www.youtube.com/watch?v=" + item.id.videoId);
                }
                // It's' not out :(
                else {
                    const msg = [
                        "Nope, it's not out.",
                        "Sorry, we're still not there yet.",
                        "You can scream 'gimme atv' all you want, it's still not out",
                        "I just checked, stop asking, it's still not out.",
                        "I'm sorry, you're gonna have to wait a lil bit longer.",
                        "Still waiting...",
                        " :soon: :tm: (i hope)"
                    ];

                    const checkedAgo = fromCache ? "\nChecked " + Math.ceil((Date.now() - Cache.get(CacheYoutubeATVLastFetch)) / 1000) + " seconds ago..." : "\nChecked just now.";

                    lobby.sendPlainTextMessage("[BOT] " + pickRandom(msg) + checkedAgo);
                }
            }

        }
    }

    /**
     * Returns the week number for a date
     * @param date 
     */
    private getWeekNumber(date: Date) {
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
            - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    public name = "ATV - Is out ?";
    public manual = "Check if the ATV is out.";
}
