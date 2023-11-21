// employers.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateEmployersDTO } from 'src/dto/update/employers.updateDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { EmployersService } from 'src/services/employers.service';

@Controller('employers')
@ApiTags('Employers')
export class EmployersController {
  constructor(private employersService: EmployersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all employers' })
  @ApiResponse({
    status: 200,
    description: 'Get all employers',
    isArray: true,
  })
  async getAllEmployers() {
    return this.employersService.getAllEmployers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get an employer' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get an employer by ID',
  })
  async getEmployerById(@Param('id') id: string) {
    return this.employersService.getEmployerById(id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update your profile' })
  @ApiResponse({
    status: 200,
    description: 'Update an employer by ID',
    type: UpdateEmployersDTO,
  })
  async updateEmployer(
    req: any,
    @Body() updateEmployerDTO: UpdateEmployersDTO,
  ) {
    return this.employersService.updateEmployer(
      req?.user.id,
      updateEmployerDTO,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete an employer by ID' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Delete an employer by ID',
  })
  async deleteEmployer(@Param('id') id: string) {
    return this.employersService.deleteEmployer(id);
  }
}
