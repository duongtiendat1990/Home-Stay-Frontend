export class HouseInfo {
  id: number;
  name: string;
  address: string;
  bedRooms: number;
  bathRooms: number;
  pricePerNight: number;
  category: string;
  description: string;
  imagesSrc: string [];
  status: string;
  constructor(id?: number, name?: string, address?: string, bedRooms?: number, bathRooms?: number, pricePerNight?: number,
              category?: string,
              description?: string, imagesSrc?: string[], status?: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.bedRooms = bedRooms;
    this.bathRooms = bathRooms;
    this.pricePerNight = pricePerNight;
    this.category = category;
    this.description = description;
    this.imagesSrc = imagesSrc;
    this.status = status;
  }
}
