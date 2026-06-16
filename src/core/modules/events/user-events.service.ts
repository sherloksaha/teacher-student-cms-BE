import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { User } from "../users/entities/user.entity";


export interface UserRegisteredEvent {
    user: {
        id: number;
        email: string;
        name: string;
    },
    timeStamp: Date,
}



@Injectable()
export class UserEventsService {

    constructor(
        private readonly eventEmitter: EventEmitter2
    ) { }


    emitUserRegistered(user: User) {
        const userRegisteredEventData: UserRegisteredEvent = {
            user: {
                id: user.id,
                email: user.email,
                name: user?.email
            },
            timeStamp: new Date()
        }

        this.eventEmitter.emit('user.registered', userRegisteredEventData)
    }
}