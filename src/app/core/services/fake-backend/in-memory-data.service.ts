import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, STATUS, ResponseOptions } from 'angular-in-memory-web-api';
import { User } from 'src/app/shared/models/entities/user';
import { Place } from 'src/app/shared/models/entities/place';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: import("angular-in-memory-web-api").RequestInfo): {} | import("rxjs").Observable<{}> | Promise<{}> {
    //WARN ! The in-memory web api library currently assumes that every collection has a primary key called id
    const login = [
      { id: 1,
        username: 'test',
        password: 'test',
        firstName: 'TestPrénom',
        lastName: 'TestNom',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1ODA2MzcyNzQsImV4cCI6MTU4MDY3MzI3NCwicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6InRlc3QifQ.jTK1erb9qd9CZV34RlsU6XOmiYzIUWQaCNotYUmEdxWKngjV5D0ECxVfnSq5_g3u9l2fx9QcqZJA-eYmFmu4fasmT_CsnjMe12dRr5CLYiTwkbxkxGdy_sPqbRVUFz60UjFsQefNfaQ7XZJnJODgAU4j-B6Ol7fpbtnHZ7avUnQl1Mj7HKofkocyneGl2zqcEwJt6J7iraNbIjveBuEA6vhyX_sh5_YSHxXxFQSwPsRIcbEHyueG9JVwJ2OAGP6FAk9BzNM5WVm-NNshWG2kejp-1Sf9YZkXatb1CjKLMJhRV4BhNrXZvwdoVx6VgNo20mz44ww2CJy-SySkUi7BDhimTqdVf6Z1x0hMArhngmzsQcpeLSxlEFNMkD4xKQCZHYwzJqPEEx9w4wfuunecBFsp_vTgDtW-pgMk3YC97X70zefxX6qXriTFme-ARGZYDcl0pBtZqfgke7aln4E4Ja_FbIvGSpLz5lgxz-5J6x9MFU5aJh8PQ5by1eAWWIVfqTp5KmNX1x6t98LRlZ5udMyPhYSvjcR6LPap3aVfGipAA04ynRg2JepkYLjWvcxYYu_wftrPUPjX_0xNhkZrSmYlqnxuKnjJU2kCgs5Z_iACM2uex_-y61RITNpKPGRbIddSpRoTe43SH2JCTpGHl3zazww24XaYv_-3ObrJYZ4',
        isAdmin: true },
      { id: 2,
        username: 'admin',
        password: 'admin',
        firstName: 'AdminPrénom',
        lastName: 'AdminNom',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.NGEOOzQwfASPJgmlz2iyO2edPS6wbHOLoTBIUUOFRNA',
        isAdmin: true }
    ];
    const place = [
      { id: 1,
        name: 'Lieu secret',
        address: '20, rue de l\'adresse',
        zipCode: '44000',
        city: 'Nantes',
        phone: '0607080910',
        isArchive: false},
        { id: 2,
          name: 'Lieu très loin',
          address: '18, rue ENI',
          zipCode: '75000',
          city: 'Paris',
          phone: '0658954721',
          isArchive: false}
      ];

    const car = [
      { id: 1,
        name: 'Peugot 208 ',
        matricule: 'AW-910-VV',
        power: 120,
        places: 5 ,
        isArchive: false,
        odometer: '120 000',
        insuranceDate: '24/10/2018',
        serviceDate: '2005',},
      { id: 1,
        name: 'Renault Megane',
        matricule: 'RE-990-VV',
        power: 90,
        places: 5 ,
        isArchive: false,
        odometer: '40 000',
        insuranceDate: '24/10/2018',
        serviceDate: '2005',}
    ];
    return {login, place, car};
  }


  // Overrides the genId method to ensure that a user always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (1).
  // if the heroes array is not empty, the method below returns the highest
  // user id + 1.
  genId(object: any[]): number {
    if (object instanceof User) {
      let users: User[] = object as User[];
      return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    }
    if (object instanceof Place) {
      let places: Place[] = object as Place[];
      return places.length > 0 ? Math.max(...places.map(user => user.id)) + 1 : 1;
    }
  }

}
