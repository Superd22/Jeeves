export interface IJeevesTask {
    /** the runnable method of the task */
    run: () => void
    /** timeout callback */
    timeOutId: NodeJS.Timer;
}