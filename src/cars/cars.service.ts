import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from "uuid";

import { Car } from './car.interface';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find((cars) => cars.id === id);
        if (!car) throw new NotFoundException(`Car with id ${id} its not found`);
        return car
        // return this.cars.filter((cars) => cars.id === id)
    }

    create(createCarDto: CreateCarDto) {
        const car: Car = { id: uuid(), ...createCarDto }
        this.cars.push(car)
        return car;
    }
}
