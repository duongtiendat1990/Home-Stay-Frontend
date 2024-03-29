import {Pipe, PipeTransform} from '@angular/core';
import {HouseCriteria} from './model/house-criteria';
import {House} from './model/house';

@Pipe({
  name: 'houseFilter'
})
export class HouseFilterPipe implements PipeTransform {

  transform(houses: House[], criteria: HouseCriteria): any {
    if (!houses) {
      return houses;
    }
    const filterKeys = Object.keys(criteria);
    return houses.filter(house => {
      return filterKeys.every(key => {
        if (!criteria[key] || (typeof criteria[key] === 'string' && !criteria[key].length)) {
          return true;
        }
        if (key === 'minPrice') {
          return house.pricePerNight >= criteria[key];
        }
        if (key === 'maxPrice') {
          return house.pricePerNight <= criteria[key];
        }
        if (typeof criteria[key] === 'number') {
          return house[key] === criteria[key];
        }
        if (typeof criteria[key] === 'string') {
          return house[key].toLowerCase().includes(criteria[key].toLowerCase());
        }
      });
    });
  }

}
