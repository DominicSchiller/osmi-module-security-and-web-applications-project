import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
  })
  export class RequestCacheService {

    static retryActionsKey: string = "retry-actions"

    constructor() {}

    storeRetryAction(retryAction: RetryAction) {
      if (!retryAction) {
        return 
      }
      let retryActions = JSON.parse((localStorage.getItem(RequestCacheService.retryActionsKey) ?? "[]")) as RetryAction[]
      retryActions.push(retryAction)
      localStorage.setItem(RequestCacheService.retryActionsKey, JSON.stringify(retryActions))
    }

    getRetryActions(userId: string): RetryAction[] {
      let retryActions = JSON.parse((localStorage.getItem(RequestCacheService.retryActionsKey) ?? "[]")) as RetryAction[]
      return retryActions.filter(action => action != null && action.userId === userId)
    }

    deleteRetryAction(deleteAction: RetryAction) {
    
      let retryActions = JSON.parse((localStorage.getItem(RequestCacheService.retryActionsKey) ?? "[]")) as RetryAction[]
      let remainingActions = retryActions.filter(action => action != null && action.uuid !== deleteAction.uuid)
      localStorage.setItem(RequestCacheService.retryActionsKey, JSON.stringify(remainingActions))
    }
  }

  export class RetryAction {
    public uuid: string
    public time: number

    constructor(
      public actionId: string,
      public userId: string,
      public params: any
    ) {
      this.uuid = uuidv4();
      this.time = new Date().getTime()
    }
  }