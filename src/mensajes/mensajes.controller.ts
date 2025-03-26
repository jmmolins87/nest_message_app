

import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    HttpStatus, 
    Param, 
    Post, 
    Put,
    Res
} from '@nestjs/common';

import { MensajesService } from './mensajes.service';

import { CreateMensajeDto } from './dto/create-mensaje-dto';


@Controller('mensajes')
export class MensajesController {

    constructor( private mensajeService: MensajesService ) {}

    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
        this.mensajeService.createMensaje(createMensajeDto)
            .then(
                mensaje => { response.status(HttpStatus.CREATED).json(mensaje); 
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la creación del mensaje' })
            });
    }

    @Get()
    getAll(@Res() response) {
        this.mensajeService.getAll()
            .then(
                mensajesList => { response.status(HttpStatus.OK).json(mensajesList); }
            )
            .catch(
                response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la obtención de mensajes' })
            );
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje) {
        this.mensajeService.updateMensaje(idMensaje, updateMensajeDto)
            .then(
                mensaje => { response.status(HttpStatus.OK).json(mensaje); }
            )
            .catch(
                response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la actualización del mensaje' })
            );
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje) {
        this.mensajeService.deleteMensaje(idMensaje)
            .then(
                res => { response.status(HttpStatus.OK).json(res) }
            )
            .catch(
                response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la eliminación del mensaje' })
            );
    }
}
