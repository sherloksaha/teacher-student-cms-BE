import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class MyPipe implements PipeTransform {
    constructor(

    ) { }

    transform() {
        return 'say Hello!';
    }
}