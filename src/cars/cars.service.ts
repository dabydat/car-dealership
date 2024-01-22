import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from "uuid";

import { Car } from './car.interface';
import { CreateCarDto, UpdateCarDto } from './dto/index.dto';


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
        const car: Car = this.cars.find((cars) => cars.id === id);
        if (!car) throw new NotFoundException(`Car with id ${id} its not found`);
        return car
    }

    create(createCarDto: CreateCarDto) {
        const car: Car = { id: uuid(), ...createCarDto }
        this.cars.push(car)
        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        let carDB = this.findOneById(id);
        if (updateCarDto.id && updateCarDto.id != id) throw new BadRequestException("Car id is not valid inside body");
        this.cars = this.cars.map((car) => {
            if (car.id === id) {
                carDB = {
                    ...carDB, //Datos de DB
                    ...updateCarDto, //Se sobreescriben los datos enviados 
                    id //Finalmente predomina el ID enviado para la actualizacion
                }
                return carDB;
            }
            return car;
        });
        return carDB;
    }

    delete(id: string) {
        this.findOneById(id);
        this.cars = this.cars.filter((cars) => cars.id !== id)
    }
}
