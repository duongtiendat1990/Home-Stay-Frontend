export class HouseInfo {
  name: string;
  address: string;
  bedRooms: number;
  bathRooms: number;
  pricePerNight: number;
  category: string;
  description: string;
  imagesSrc: string [];

  constructor(name: string, address: string, bedRooms: number, bathRooms: number, pricePerNight: number, category: string,
              description: string, imagesSrc: string[]) {
    this.name = name;
    this.address = address;
    this.bedRooms = bedRooms;
    this.bathRooms = bathRooms;
    this.pricePerNight = pricePerNight;
    this.category = category;
    this.description = description;
    this.imagesSrc = imagesSrc;
  }
}
