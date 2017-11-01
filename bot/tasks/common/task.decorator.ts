import { JeevesTasksService } from './tasks.service';
import { Container } from 'typedi';
import { IJeevesTaskConstructable } from './interfaces/task-constructable.interface';
import { IJeevesTask } from './interfaces/task.interface';

/**
 * Decorator function to register & launch a background task for jeeves
 * @param args 
 */
export function JeevesTask(args?: IJeevesTaskArgs) {
    return function <T extends IJeevesTaskConstructable>(task: T) {
        const taskService = Container.get(JeevesTasksService);

        // Declare the task
        taskService.registerTask(task);

        // If we want to auto-run, try and run.
        if (args && args.autoRun) taskService.run(task);
    }
}

export interface IJeevesTaskArgs {
    /** exec this task every x (in miliseconds) */
    time?:number;
    /** launch the task immediately on start-up */
    autoRun?:boolean;
}