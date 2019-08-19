export class House {
  id: number;
  name: string;
  address: string;
  bedRooms: number;
  bathRooms: number;
  description: string;
  pricePerNight: number;
  images: string[];
  isRented: boolean;
  status: string;
  category: string;


  constructor(name?: string, address?: string, bedRooms?: number, bathRooms?: number, description?: string,
              pricePerNight?: number, category?: string, images?: string[], isRented?: boolean, status?: string, id?: number) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.bedRooms = bedRooms;
    this.bathRooms = bathRooms;
    this.description = description;
    this.pricePerNight = pricePerNight;
    this.images = images;
    this.isRented = isRented;
    this.status = status;
    this.category = category;
  }
}
