import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommunicationService {

    // Observable string sources
    private communicationAnnouncedSource = new Subject<string>();
    private communicationConfirmedSource = new Subject<string>();

    // Observable string streams
    communicationAnnounced$ = this.communicationAnnouncedSource.asObservable();
    communicationConfirmed$ = this.communicationConfirmedSource.asObservable();

    // Service message commands
    announceCommunication(mission: string) {
        this.communicationAnnouncedSource.next(mission);
    }

    confirmCommunication(astronaut: string) {
        this.communicationConfirmedSource.next(astronaut);
    }
}
