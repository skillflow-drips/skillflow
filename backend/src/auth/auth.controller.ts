import { Controller, Get, Post, Body, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Sep10Service } from './sep10.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sep10: Sep10Service
  ) {}

  @Get('challenge')
  async getChallenge(@Query('address') address: string) {
    const xdr = await this.sep10.generateChallenge(address);
    return { xdr };
  }

  @Post('wallet')
  async walletAuth(@Body() body: { stellarAddress: string; signedXdr: string }) {
    const isValid = await this.sep10.verifySignature(body.signedXdr);
    if (!isValid) throw new UnauthorizedException('Invalid wallet signature');
    
    return this.authService.login(body.stellarAddress);
  }
}
