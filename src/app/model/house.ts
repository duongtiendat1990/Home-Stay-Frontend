export class House {
  name: string;
  address: string;
  bedRooms: number;
  bathRooms: number;
  description: string;
  pricePerNight: number;
  isRented: Boolean;
  category: string;
  images: File [];

  constructor( name: string, address: string, bedRooms: number, bathRooms: number, pricePerNight: number, isRented: Boolean,
              category: string, description: string, images: File[]) {
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
