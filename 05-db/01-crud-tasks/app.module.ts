import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),
    TasksModule,
  ],
})
export class AppModule {}
