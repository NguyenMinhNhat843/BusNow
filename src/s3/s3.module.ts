import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';

@Module({
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {
  // This module can be used to handle S3 related functionalities
  // such as file uploads, downloads, and management.
}
