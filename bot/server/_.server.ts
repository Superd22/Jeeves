import { JeevesCommands, DbStats } from './../commands/_.commands';
import * as express from "express";
import { countKillCommand } from '../commands/kill/countKill';
import { topKillsCommand } from '../commands/kill/topKills';
import { aSpectrumCommand } from 'spectrum-bot';
import { topSavesCommand } from '../commands/save/topSaves';

export class APIServer {
    protected app = express();
    protected server = this.app.listen(1815, () => {
        console.log("SERVER OK");
    });

    public constructor() {
        this.app.get('/kills/top', this.topKillers);
        this.app.get('/saves/top', this.topSavers);
        this.app.get('/isup', this.isUp);
        this.app.get('/commands', this.commandLists);
        this.app.get('/dumbStats', this.dumpStats);
    }

    public topKillers(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        topKillsCommand.getTopCount().then((top) => res.end(JSON.stringify(top)));
    }

    public topSavers(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        topSavesCommand.getTopCount().then((top) => res.end(JSON.stringify(top)));
    }

    public isUp(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(true));
    }

    public commandLists(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        let c = [];
        JeevesCommands.commands.forEach((command: aSpectrumCommand) => {
            c.push({ name: command.name, shortcode: command.shortCode, help: command.manual });
        });
        res.end(JSON.stringify(c));
    }

    public dumpStats(req, res) {
        res.header("Access-Control-Allow-Origin", "*");

        DbStats.find({}, (err, docs) => {
            res.end(JSON.stringify(docs));
        });
    }

}