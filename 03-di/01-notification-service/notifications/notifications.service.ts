import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { appendFile } from 'node:fs';


@Injectable()
export class NotificationsService {

    private batRequestExeption (to: string) {
        if(!to) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        };
    };

    private getFormattedDateTime() {
        const now = new Date();
        
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        
        return `${day}.${formattedMonth}.${year}, ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    private logMessages(notification: string) {
        appendFile('./notifications/logMessage.txt', `${this.getFormattedDateTime()} ${notification}\n`, function(error){
            if(error){
                return console.log(error);
            }
        })
    }

    sendEmail(to: string, subject: string, message: string): void {
        this.batRequestExeption(to);

        const notification = `Email sent to ${to}: [${subject}] ${message}`;
        this.logMessages(notification);

        console.log(notification);
    }

    sendSMS(to: string, message: string): void {
        this.batRequestExeption(to);

        const notification = `SMS sent to ${to}: ${message}`;
        this.logMessages(notification);

        console.log(notification);
    }
}
