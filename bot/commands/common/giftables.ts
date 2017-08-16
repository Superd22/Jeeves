import { DbStats } from './../_.commands';
import { receivedTextMessage } from 'spectrum-bot/lib/';
export class GiftablesHelper {
    /** The regex for optional target for a giftable */
    public static optTarget = "( @[^ ]+)?[ ]*";

    /** Returns the target user to be gifted something.
     * @param message the original message containing the gift command
     * @param matchs the returned matchs array to check for a target other than the user.
     * @return the username of the target.
     */
    public static getTarget(message:receivedTextMessage, matchs:Array<any>) {
        var username = message.member.displayname;
        console.log("get Target");
        console.log(matchs);
        console.log(GiftablesHelper.hasTarget(matchs));
        if(GiftablesHelper.hasTarget(matchs)) username = matchs[1].trim().replace("@","");

        return username;
    } 
    /**
     * Check if the gift has a target other than the user issuing the command
     * @param matchs the returned matchs array
     * @return true if target is found, false otherwise.
     */
    public static hasTarget(matchs:Array<any>) {
        return (matchs[1] && matchs[1].length > 0)
    }

    /**
     * Helper function to return a different string wheter or not we have a target 
     * @param withoutCourtesy string returned if no target is found
     * @param withCourtesy string returned if target is found
     * @param match array of matches to find param 
     * @param curtesy wheter or not we're in curtesy mod
     */
    public static curtesy(withoutCourtesy:string, withCourtesy:string, curtesy:boolean);
    public static curtesy(withoutCourtesy:string, withCourtesy:string, matchs:Array<any>);
    public static curtesy(withoutCourtesy:string, withCourtesy:string, rd) {
        if(typeof rd === typeof true) return rd ? withCourtesy : withoutCourtesy;
        else return GiftablesHelper.hasTarget(rd) ? withCourtesy : withoutCourtesy;
    }

    /**
     * Helper function to update stats for a given giftable and the guy who asked for it & received it
     * @param giftable the name of the giftable
     * @param originalUser the name of the user who asked for
     * @param username the name of the user who got the coffee
     */
    public static updateStatsForGiftable(giftable:string, originalUser:string, username:string) {
        DbStats.update({ stat: giftable+'Served' }, { $inc: {count : 1 } }, { upsert: true }, () => {
            console.log("[STAT] "+giftable+"++");
        });

        if(username != originalUser)
        DbStats.update({ stat: 'gifted_'+giftable+'_'+originalUser }, { $inc: {count : 1 } }, { upsert: true }, () => { });

        DbStats.update({ stat: 'received_'+giftable+'_'+username }, { $inc: {count : 1 } }, { upsert: true }, () => { });
    }


}