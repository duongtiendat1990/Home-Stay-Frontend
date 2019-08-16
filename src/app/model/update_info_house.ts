export class UpdateInfoHouse {
  name: string;
  address: string;
  bedRooms: number;
  bathRooms: number;
  description: string;
  pricePerNight: number;
  category: string;
  isRented: boolean;
  images: File [];

  constructor(name: string, address: string, bedRooms: number,
              bathRooms: number, pricePerNight: number,
              category: string, isRented: boolean, description: string, images: File[]) {
    this.name = name;
    this.address = address;
    this.bedRooms = bedRooms;
    this.bathRooms = bathRooms;
    this.pricePerNight = pricePerNight;
    this.isRented = isRented;
    this.category = category;
    this.description = description;
    this.images = images;
  }
}
