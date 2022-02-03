export interface TodoItem {
    /**
     * Internal ID, not user modifiable, unique per item
     */
    id:number;
    /**
     * Name or description of the task
     */
    description:string;
    /**
     * Supposed completion Date, undefined fo today
     */
    dueDate:number|undefined;
    /**
     * If true, it indicates completed task
     */
    completed?:boolean;
}