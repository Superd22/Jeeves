import * as express from "express";
import { countKillCommand } from '../commands/kill/countKill';
import { topKillsCommand } from '../commands/kill/topKills';

export class APIServer {
    protected app = express();
    protected server = this.app.listen(18103, () => {
        console.log("SERVER OK");
    });

    public constructor() {
        this.app.get('/kills/top', this.topKillers);
    }

    public topKillers(req,res) {
        res.header("Access-Control-Allow-Origin", "*");
        topKillsCommand.getTopCount().then((top) => res.end(JSON.stringify(top)));
    }
}