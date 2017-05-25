import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommunicationService {

    // Observable string sources
    private communicationAnnouncedSource = new Subject<any>();
    private communicationConfirmedSource = new Subject<any>();

    // Observable string streams
    communicationAnnounced$ = this.communicationAnnouncedSource.asObservable();
    communicationConfirmed$ = this.communicationConfirmedSource.asObservable();

    // Service message commands
    announceCommunication(mission: any) {
        this.communicationAnnouncedSource.next(mission);
    }

    confirmCommunication(astronaut: any) {
        this.communicationConfirmedSource.next(astronaut);
    }
}
