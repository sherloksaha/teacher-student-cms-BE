import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import type { UserRegisteredEvent } from "../user-events.service";


// this will responf  to the events emitted by event emitter
@Injectable()

export class UserRegisteredListener{
    private readonly logger = new Logger(UserRegisteredListener.name);

    @OnEvent('user.registered')
    handleUserRegisteredEvent(event: UserRegisteredEvent): void{
        console.log("i am listning and waiting for any user to be registered")
        const {user, timeStamp} = event;
        this.logger.log(`Welcome ${user?.name}`)
    }
}