export class HouseCriteria {
  name = '';
  address = '';
  bedRooms: number;
  bathRooms: number;
  category = '';
  minPrice: number;
  maxPrice: number;
  status = '';

  constructor(name?: string, address?: string, bedRooms?: number, bathRooms?: number, category?: string,
              minPrice?: number, maxPrice?: number, status?: string) {
    this.name = name;
    this.address = address;
    this.bedRooms = bedRooms;
    this.bathRooms = bathRooms;
    this.category = category;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.status = status;
  }
}
