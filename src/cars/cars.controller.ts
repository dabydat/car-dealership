import { Controller, Get, Post, Patch, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {

    constructor(private readonly carsService: CarsService) { }

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(":id")
    getCarById(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.findOneById(id)
    }

    @Post()
    createCar(@Body() createCarDto: CreateCarDto) {
        return createCarDto
    }

    @Patch(":id")
    updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() body: any) {
        return { ...body, id }
    }

    @Delete(":id")
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
        return {
            method: "delete",
            id
        }
    }
}
