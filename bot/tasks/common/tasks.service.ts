import { IJeevesTask } from './interfaces/task.interface';
import { IJeevesTaskConstructable } from './interfaces/task-constructable.interface';
import { Service } from 'typedi';
import { importClassesFromDirectories } from '../utils/import-classes-from-directory';

@Service()
export class JeevesTasksService {
    private _taskDirectory = __dirname + "/../runnables/**/**.task.ts";
    private _map: Map<IJeevesTaskConstructable, IJeevesTask> = new Map();

    constructor() {
        // Auto-load our tasks
        importClassesFromDirectories([this._taskDirectory]);
    }


    /**
     * Registers a task 
     * @param task 
     */
    public registerTask(task: IJeevesTaskConstructable) {
        this._map.set(task, new task());
    }


    /**
     * Runs a background task
     * @param task the task to run
     * @param force whether to force the running if this task is already running
     */
    public run(task: IJeevesTaskConstructable, force?: boolean) {
        const instance = this._map.get(task);

        if (!instance.timeOutId || force) instance.run();
    }


}