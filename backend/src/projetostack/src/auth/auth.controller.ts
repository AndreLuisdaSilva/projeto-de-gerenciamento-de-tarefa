import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from '../Dto/login.dto';
import { RegisterDto } from '../Dto/register.dto';

@Controller('auth')
@ApiTags('Auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() data: LoginDto): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(data.email, data.password); // Validate user credentials
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
