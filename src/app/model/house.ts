export class House {
  name: string;
  address: string;
  bedRooms: number;
  bathRooms: number;
  pricePerNight: number;
  category: string;
  description: string;
  images: File [];

  constructor(name: string, address: string, bedRooms: number, bathRooms: number, pricePerNight: number,
              category: string, description: string, images: File[]) {
    this.name = name;
    this.address = address;
    this.bedRooms = bedRooms;
    this.bathRooms = bathRooms;
    this.pricePerNight = pricePerNight;
    this.category = category;
    this.description = description;
    this.images = images;
  }
}
