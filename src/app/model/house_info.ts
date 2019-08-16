export class HouseInfo {
  id: number;
  name: string;
  address: string;
  bedRooms: number;
  bathRooms: number;
  pricePerNight: number;
  isRented: boolean;
  category: string;
  description: string;
  imagesSrc: string [];

  constructor(id?: number, name?: string, address?: string, bedRooms?: number,
              bathRooms?: number, pricePerNight?: number, isRented?: boolean, category?: string,
              description?: string, imagesSrc?: string[]) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.bedRooms = bedRooms;
    this.bathRooms = bathRooms;
    this.pricePerNight = pricePerNight;
    this.isRented = isRented;
    this.category = category;
    this.description = description;
    this.imagesSrc = imagesSrc;
  }
}
