import { IJeevesTask } from './task.interface';

export interface IJeevesTaskConstructable {
    /** constructor for this task */
    new(): IJeevesTask
}